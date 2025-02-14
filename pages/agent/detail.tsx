import React, { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import ReviewCard from '../../libs/components/agent/ReviewCard';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Member } from '../../libs/types/member/member';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Messages, REACT_APP_API_URL } from '../../libs/config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CREATE_COMMENT, CREATE_NOTIFICATION, LIKE_CAR, SAVE_CAR } from '../../apollo/user/mutation';
import { GET_CARS, GET_COMMENTS, GET_MEMBER } from '../../apollo/user/query';
import { T } from '../../libs/types/common';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import { Car } from '../../libs/types/car/car';
import { CarsInquiry } from '../../libs/types/car/car.input';
import FindingCarCard from '../../libs/components/homepage/FindingCarCard';
import { useTranslation } from 'next-i18next';
import BusinessIcon from '@mui/icons-material/Business';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const AgentDetail: NextPage = ({ initialInput, initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [agentId, setAgentId] = useState<string | null>(null);
	const [agent, setAgent] = useState<Member | null>(null);
	const [searchFilter, setSearchFilter] = useState<CarsInquiry>(initialInput);
	const [agentCars, setAgentCars] = useState<Car[]>([]);
	const [carTotal, setCarTotal] = useState<number>(0);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [agentComments, setAgentComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.MEMBER,
		commentContent: '',
		commentRefId: '',
	});

	/** APOLLO REQUESTS **/
	const [createComment] = useMutation(CREATE_COMMENT);
	const [likeTargetCar] = useMutation(LIKE_CAR);
	const [saveTargetCar] = useMutation(SAVE_CAR);
	const [notificate] = useMutation(CREATE_NOTIFICATION);

	const {
		loading: getMemberLoading,
		data: getMemberData,
		error: getMemberError,
		refetch: getMemberRefetch,
	} = useQuery(GET_MEMBER, {
		fetchPolicy: 'network-only',
		variables: { input: agentId },
		skip: !agentId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgent(data?.getMember);
			setSearchFilter({
				...searchFilter,
				search: {
					memberId: data?.getMember?._id,
				},
			});
			setCommentInquiry({
				...commentInquiry,
				search: {
					commentRefId: data?.getMember?._id,
				},
			});
			setInsertCommentData({
				...insertCommentData,
				commentRefId: data?.getMember?._id,
			});
		},
	});

	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch
	} = useQuery(GET_CARS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		skip: !searchFilter.search.memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentCars(data?.getCars?.list);
			setCarTotal(data?.getCars?.metaCounter[0]?.total ?? 0);
		},
	});

	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: 'network-only',
		variables: { input: commentInquiry },
		skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		},
	});
	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.agentId) setAgentId(router.query.agentId as string);
	}, [router]);

	useEffect(() => {
		if (searchFilter.search.memberId) {
			getCarsRefetch({ variables: { input: searchFilter } }).then();
		}
	}, [searchFilter]);
	useEffect(() => {
		if (commentInquiry.search.commentRefId) {
			getCommentsRefetch({ variables: { input: commentInquiry } }).then();
		}
	}, [commentInquiry]);

	/** HANDLERS **/
	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`);
			else await router.push(`/member?memberId=${memberId}`);
		} catch (error) {
			await sweetErrorHandling(error);
		}
	};

	const carPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		setSearchFilter({ ...searchFilter });
	};

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
		try {
			if (!user._id) throw new Error(Messages.error2);
			if (user._id === agentId) throw new Error('Cannot write a review for yourself');
			const result = await createComment({
				variables: {
					input: insertCommentData,
				},
			});

			await notificate({
				variables: {
					input: {
						authorId: user._id,
						notificationType: 'COMMENT',
						notificationGroup: 'MEMBER',
						receiverId: agent?._id,
						commentId: result?.data?.createComment?._id,
					}
				}
			});

			setInsertCommentData({ ...insertCommentData, commentContent: '' });

			await getCommentsRefetch({ input: commentInquiry });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const likeCarHandler = async (user: T, id: string, creatorId: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetCar({
				variables: { input: id },
			});

			await notificate({
				variables: {
					input: {
						carId: id,
						authorId: user._id,
						notificationType: 'LIKE',
						notificationGroup: 'CAR',
						receiverId: creatorId,
					}
				}
			});

			await getCarsRefetch({ input: searchFilter });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const saveCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await saveTargetCar({
				variables: { input: id },
			});
			await getCarsRefetch({ input: searchFilter });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <div>AGENT DETAIL PAGE MOBILE</div>;
	} else {
		return (
			<Stack className={'agent-detail-page'}>
				<Stack className={'container'}>
					<Stack className={'agent-info'}>
						<img
							src={agent?.image ? `${REACT_APP_API_URL}/${agent?.image}` : '/img/profile/defaultUser.svg'}
							alt=""
						/>
						<Box component={'div'} className={'info'} onClick={() => redirectToMemberPageHandler(agent?._id as string)}>
							<strong>{agent?.titleNick}</strong>
							<div>
								<CallOutlinedIcon className={'icon'} />
								<span>{agent?.phone}</span>
								<AddIcCallOutlinedIcon className={'icon'} />
								<span>{agent?.phone2}</span>
							</div>
							<div>
								<AlternateEmailOutlinedIcon className={'icon'} />
								<span>{agent?.email}</span>
							</div>
							<div>
								<BusinessIcon className={'icon'} />
								<span>Office: {agent?.address}</span>
							</div>
							<div>
								<img src="/img/icons/naverb.svg" className={'kakao'} alt="" />
								<span>{agent?.naverBlog}</span>
								<img src="/img/icons/instaw.svg" alt="" />
								<span>{agent?.instagram}</span>
							</div>
							<div>
								<img src="/img/icons/kakaow.svg" className={'kakao'} alt="" />
								<span>{agent?.kakaoTalk}</span>
								<img src="/img/icons/xcomw.svg" alt="" />
								<span>{agent?.xcom}</span>
							</div>
							<div>
								<img src="/img/icons/youtubew.svg" className={'kakao'} alt="" />
								<span>{agent?.youtube}</span>
								<img src="/img/icons/facew.svg" className={'kakao'} alt="" />
								<span>{agent?.facebook}</span>
							</div>
						</Box>
					</Stack>
					<Stack className={'agent-home-list'}>
						<Stack className={'card-wrap'}>
							{agentCars?.map((car: Car) => {
								return (
									<div className={'wrap-main'} key={car?._id}>
										<FindingCarCard car={car} key={car?._id} likeCarHandler={likeCarHandler} saveCarHandler={saveCarHandler} />
									</div>
								);
							})}
						</Stack>
						<Stack className={'pagination'}>
							{carTotal ? (
								<>
									<Stack className="pagination-box">
										<Pagination
											page={searchFilter.page}
											count={Math.ceil(carTotal / searchFilter.limit) || 1}
											onChange={carPaginationChangeHandler}
											shape="rounded"
											color="secondary"
										/>
									</Stack>
									<span>
										{t('Total')} {carTotal} {t('car')}{carTotal > 1 ? 's' : ''} {t('available')}
									</span>
								</>
							) : (
								<div className={'no-data'}>
									<img src="/img/icons/icoAlert.svg" alt="" />
									<p>{t('No cars found!')}</p>
								</div>
							)}
						</Stack>
					</Stack>
					<Stack className={'review-box'}>
						<Stack className={'main-intro'}>
							<span>{t('Reviews')}</span>
							<p>{t('We are glad to see you again!')}</p>
						</Stack>
						{commentTotal !== 0 && (
							<Stack className={'review-wrap'}>
								<Box component={'div'} className={'title-box'}>
									<StarIcon />
									<span>
										{commentTotal} {t('review')}{commentTotal > 1 ? 's' : ''}
									</span>
								</Box>
								{agentComments?.map((comment: Comment) => {
									return <ReviewCard comment={comment} key={comment?._id} />;
								})}
								<Box component={'div'} className={'pagination-box'}>
									<Pagination
										page={commentInquiry.page}
										count={Math.ceil(commentTotal / commentInquiry.limit) || 1}
										onChange={commentPaginationChangeHandler}
										shape="circular"
										color="secondary"
									/>
								</Box>
							</Stack>
						)}

						<Stack className={'leave-review-config'}>
							<Typography className={'main-title'}>{t('Leave A Review')}</Typography>
							<Typography className={'review-title'}>{t('Review')}</Typography>
							<textarea
								onChange={({ target: { value } }: any) => {
									setInsertCommentData({ ...insertCommentData, commentContent: value });
								}}
								value={insertCommentData.commentContent}
							></textarea>
							<Box className={'submit-btn'} component={'div'}>
								<Button
									className={'submit-review'}
									disabled={insertCommentData.commentContent === '' || user?._id === ''}
									onClick={createCommentHandler}
								>
									<Typography className={'title'}>{t('Submit Review')}</Typography>
									<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
										<g clipPath="url(#clip0_6975_3642)">
											<path
												d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
												fill="#181A20"
											/>
										</g>
										<defs>
											<clipPath id="clip0_6975_3642">
												<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
											</clipPath>
										</defs>
									</svg>
								</Button>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

AgentDetail.defaultProps = {
	initialInput: {
		page: 1,
		limit: 12,
		search: {
			memberId: '',
		},
	},
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutBasic(AgentDetail);
