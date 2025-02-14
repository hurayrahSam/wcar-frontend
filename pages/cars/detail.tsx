import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { NextPage } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import moment from 'moment';
import { formatterStr } from '../../libs/utils';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_CAR, GET_CARS, GET_COMMENTS } from '../../apollo/user/query';
import { CREATE_COMMENT, CREATE_NOTIFICATION, LIKE_CAR, SAVE_CAR } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import withLayoutMain from '../../libs/components/layout/LayoutHome';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'; // country
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined'; // brand
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'; // repair
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined'; // crush
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'; // city
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined'; // highway
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'; // max speed
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined'; // hundred speed
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined'; // height
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'; //width
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'; // lenght
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined'; // weight
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'; // load weight
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined'; // tire size
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined'; //seats up
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined'; // wheela base
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined'; // cruise control
import SurroundSoundOutlinedIcon from '@mui/icons-material/SurroundSoundOutlined'; // esc
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined'; // auto drive
import FlashlightOnOutlinedIcon from '@mui/icons-material/FlashlightOnOutlined'; // exterior light
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'; // ponarama
import AirlineSeatLegroomExtraOutlinedIcon from '@mui/icons-material/AirlineSeatLegroomExtraOutlined'; // heated seat
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined'; // cool seat
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined'; // touch screen display
import HighlightOutlinedIcon from '@mui/icons-material/HighlightOutlined'; // auto head light
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined'; // start stop
import NoiseControlOffOutlinedIcon from '@mui/icons-material/NoiseControlOffOutlined'; // noise cencellation
import SettingsRemoteOutlinedIcon from '@mui/icons-material/SettingsRemoteOutlined'; // remote keyylass
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'; // laneDw\
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; // blind monitoring
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined'; //  rear traffic alert
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined'; // apple play
import CastOutlinedIcon from '@mui/icons-material/CastOutlined'; // android play
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined'; // voice control
import BluetoothConnectedOutlinedIcon from '@mui/icons-material/BluetoothConnectedOutlined'; // car bluetooth
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined'; // charging
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined'; // parking assist
import ThreeSixtyOutlinedIcon from '@mui/icons-material/ThreeSixtyOutlined'; // 360 camera
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined'; // back sensor
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined'; // front sensor
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined'; // front camera
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined'; // rear camera
import LensBlurOutlinedIcon from '@mui/icons-material/LensBlurOutlined'; // heads up display
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined'; // climate control
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined'; // adjustable seat
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'; // memory seat
import BatteryCharging20OutlinedIcon from '@mui/icons-material/BatteryCharging20Outlined'; // regenerative braking
import DeblurOutlinedIcon from '@mui/icons-material/DeblurOutlined'; // traction control
import VideoStableOutlinedIcon from '@mui/icons-material/VideoStableOutlined'; // stability
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'; //hill start
import TireRepairOutlinedIcon from '@mui/icons-material/TireRepairOutlined'; // tire pressure
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined'; // push button
import TrendPropertyCard from '../../libs/components/homepage/ReccomendedCarsCard';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FitbitOutlinedIcon from '@mui/icons-material/FitbitOutlined'; // flibit
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import { Car } from '../../libs/types/car/car';
import { CarType } from '../../libs/enums/car.enum';
import Review from '../../libs/components/car/Review';
import RecommendedCarCard from '../../libs/components/homepage/ReccomendedCarsCard';
import { useTranslation } from 'next-i18next';







SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const CarDetailList: NextPage = ({ initialComment, ...props }: any) => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const [carId, setCarId] = useState<string | null>(null);
    const [car, setCar] = useState<Car | null>(null);
    const [slideImage, setSlideImage] = useState<string>('');
    const [destinationCars, setDestinationCars] = useState<Car[]>([]);
    const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
    const [propertyComments, setPropertyComments] = useState<Comment[]>([]);
    const [commentTotal, setCommentTotal] = useState<number>(0);
    const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
        commentGroup: CommentGroup.CAR,
        commentContent: '',
        commentRefId: '',
    });

    /** APOLLO REQUESTS **/
    const [likeTargetCar] = useMutation(LIKE_CAR);
    const [saveTargetCar] = useMutation(SAVE_CAR);
    const [createComment] = useMutation(CREATE_COMMENT);
    const [notificate] = useMutation(CREATE_NOTIFICATION);
    const {
        loading: getCarLoading,
        data: getCarData,
        error: getCarError,
        refetch: getCarRefetch
    } = useQuery(GET_CAR, {
        fetchPolicy: 'network-only',
        variables: { input: carId },
        skip: !carId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getCar) setCar(data?.getCar);
            if (data?.getCar) setSlideImage(data?.getCar?.carImages[0]);
        },
    });

    const {
        loading: getCarsLoading,
        data: getCarsData,
        error: getCarsError,
        refetch: getCarsRefetch
    } = useQuery(GET_CARS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            input: {
                page: 1,
                limit: 4,
                sort: 'createdAt',
                direction: Direction.DESC,
                search: {
                    locationList: car?.carLocation ? [car?.carLocation] : [],
                },

            },
        },
        skip: !carId && !car,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getCars) setDestinationCars(data?.getCars?.list);
        },
    });

    const {
        loading: getCommentsLoading,
        data: getCommentsData,
        error: getCommentsError,
        refetch: getCommentsRefetch
    } = useQuery(GET_COMMENTS, {
        fetchPolicy: 'cache-and-network',
        variables: { input: initialComment },
        skip: !commentInquiry.search.commentRefId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getComments?.list) setPropertyComments(data?.getComments?.list);
            setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router.query.id) {
            setCarId(router?.query?.id as string);
            setCommentInquiry({
                ...commentInquiry,
                search: {
                    commentRefId: router?.query?.id as string,
                },
            });
            setInsertCommentData({
                ...insertCommentData,
                commentRefId: router?.query?.id as string,
            });
        }
    }, [router]);

    useEffect(() => {
        if (commentInquiry.search.commentRefId) {
            getCommentsRefetch({ input: commentInquiry });
        }
    }, [commentInquiry]);

    /** HANDLERS **/
    const changeImageHandler = (image: string) => {
        setSlideImage(image);
    };

    const likeCarHandler = async (user: T, id: string, creatorId: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

            await likeTargetCar({
                variables: { input: id },
            });

            await notificate({
                variables: {
                    input: {
                        carId: id,
                        authorId: user?._id,
                        notificationType: 'LIKE',
                        notificationGroup: 'CAR',
                        receiverId: creatorId,
                    }
                }
            });

            await getCarRefetch({ input: id });
            getCarsRefetch({
                input: {
                    page: 1,
                    limit: 4,
                    sort: 'createdAt',
                    direction: Direction.DESC,
                    search: {
                        locationList: [car?.carLocation],
                    },
                },
            });

            await sweetTopSmallSuccessAlert('seccess', 800);
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then;
        }
    };

    const saveCarHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

            await saveTargetCar({
                variables: { input: id },
            });

            await getCarRefetch({ input: id });
            getCarsRefetch({
                input: {
                    page: 1,
                    limit: 4,
                    sort: 'createdAt',
                    direction: Direction.DESC,
                    search: {
                        locationList: [car?.carLocation],
                    },
                },
            });

            await sweetTopSmallSuccessAlert('seccess', 800);
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then;
        }
    };

    const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
        commentInquiry.page = value;
        setCommentInquiry({ ...commentInquiry });
    };

    const createCommentHandler = async () => {
        try {
            if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);
            const result = await createComment({ variables: { input: insertCommentData } });

            await notificate({
                variables: {
                    input: {
                        carId: car?._id,
                        authorId: user._id,
                        notificationType: 'COMMENT',
                        notificationGroup: 'CAR',
                        receiverId: car?.creatorData?._id,
                        commentId: result?.data?.createComment?._id,
                    }
                }
            });

            setInsertCommentData({ ...insertCommentData, commentContent: '' });

            await getCommentsRefetch({ input: commentInquiry });
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };
    console.log('car', car?.carImages)
    if (getCarLoading) {
        return (
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
                <CircularProgress size={'4rem'} />
            </Stack>
        );
    };

    if (device === 'mobile') {
        return <div>CAR DETAIL PAGE</div>;
    } else {
        return (
            <div id={'property-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'left-box'}>
                                    <Typography className={'title-main'}>{car?.carTitle}</Typography>
                                    <Typography className={'title-small'}>{car?.carModel}</Typography>
                                    <Stack className={'top-box'}>
                                        <Typography className={'city'}>{car?.carLocation}</Typography>
                                        <Stack className={'divider'}></Stack>
                                        <Stack className={'buy-rent-box'}>
                                            {car?.carBarter && (
                                                <>
                                                    <Stack className={'circle'}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                            <circle cx="3" cy="3" r="3" fill="#EB6753" />
                                                        </svg>
                                                    </Stack>
                                                    <Typography className={'buy-rent'}>{t('Barter')}</Typography>
                                                </>
                                            )}

                                            {car?.carRent && (
                                                <>
                                                    <Stack className={'circle'}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                            <circle cx="3" cy="3" r="3" fill="#EB6753" />
                                                        </svg>
                                                    </Stack>
                                                    <Typography className={'buy-rent'}>{t('Rent')}</Typography>
                                                </>
                                            )}
                                        </Stack>
                                        <Stack className={'divider'}></Stack>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <g clipPath="url(#clip0_6505_6282)">
                                                <path
                                                    d="M7 14C5.61553 14 4.26216 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303297 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303297 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26216 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9498 11.9498C10.637 13.2625 8.85652 14 7 14ZM7 0.931878C5.79984 0.931878 4.62663 1.28777 3.62873 1.95454C2.63084 2.62132 1.85307 3.56903 1.39379 4.67783C0.934505 5.78664 0.814336 7.00673 1.04848 8.18384C1.28262 9.36094 1.86055 10.4422 2.70919 11.2908C3.55783 12.1395 4.63907 12.7174 5.81617 12.9515C6.99327 13.1857 8.21337 13.0655 9.32217 12.6062C10.431 12.1469 11.3787 11.3692 12.0455 10.3713C12.7122 9.37337 13.0681 8.20016 13.0681 7C13.067 5.39099 12.4273 3.84821 11.2895 2.71047C10.1518 1.57273 8.60901 0.933037 7 0.931878Z"
                                                    fill="#181A20"
                                                />
                                                <path
                                                    d="M9.0372 9.7275C8.97153 9.72795 8.90643 9.71543 8.84562 9.69065C8.7848 9.66587 8.72948 9.62933 8.68282 9.58313L6.68345 7.58375C6.63724 7.53709 6.6007 7.48177 6.57592 7.42096C6.55115 7.36015 6.53863 7.29504 6.53907 7.22938V2.7275C6.53907 2.59464 6.59185 2.46723 6.6858 2.37328C6.77974 2.27934 6.90715 2.22656 7.04001 2.22656C7.17287 2.22656 7.30028 2.27934 7.39423 2.37328C7.48817 2.46723 7.54095 2.59464 7.54095 2.7275V7.01937L9.39595 8.87438C9.47462 8.9425 9.53001 9.03354 9.55436 9.13472C9.57871 9.2359 9.5708 9.34217 9.53173 9.43863C9.49266 9.53509 9.4244 9.61691 9.3365 9.67264C9.24861 9.72836 9.14548 9.75519 9.04157 9.74938L9.0372 9.7275Z"
                                                    fill="#181A20"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_6505_6282">
                                                    <rect width="14" height="14" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <Typography className={'date'}>{moment().diff(car?.createdAt, 'days')} {t('days ago')}</Typography>
                                    </Stack>
                                    <Stack className={'bottom-box'}>
                                        <Stack className="option">
                                            <img src="/img/icons/years.svg" alt="" /> <Typography>{car?.carYear}</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/speeds.svg" alt="" /> <Typography>{car?.carMileage}</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/transs.svg" alt="" /> <Typography>{car?.carTransmission}</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/petrols.svg" alt="" /> <Typography>{car?.carFuelType}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'right-box'}>
                                    <Stack className="buttons">
                                        <Typography>{t('Save')}</Typography>
                                        <Box className={'save-box'}>
                                            {car?.meSaved && car?.meSaved[0]?.mySaved ? (

                                                <BookmarkIcon
                                                    // @ts-ignore
                                                    onClick={() => saveCarHandler(user, car?._id)}
                                                    color="secondary" fontSize={'medium'} />
                                            ) : (
                                                <BookmarkBorderIcon
                                                    fontSize={'medium'}
                                                    // @ts-ignore
                                                    onClick={() => saveCarHandler(user, car?._id)}
                                                />
                                            )}
                                        </Box>
                                        <Stack className="button-box">
                                            <RemoveRedEyeIcon fontSize="medium" />
                                            <Typography>{car?.carViews}</Typography>
                                        </Stack>
                                        <Stack className="button-box">
                                            {car?.meLiked && car?.meLiked[0]?.myFavorite ? (

                                                <FavoriteIcon
                                                    // @ts-ignore
                                                    onClick={() => likeCarHandler(user, car?._id, car?.creatorData?._id)}
                                                    color="primary" fontSize={'medium'} />
                                            ) : (
                                                <FavoriteBorderIcon
                                                    fontSize={'medium'}
                                                    // @ts-ignore
                                                    onClick={() => likeCarHandler(user, car?._id, car?.creatorData?._id)}
                                                />
                                            )}
                                            <Typography>{car?.carLikes}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Typography>${formatterStr(car?.carPrice)}</Typography>
                                    <Stack className={'offer'}>
                                        <img src="/img/icons/offerb.svg" alt="" /><Typography>Make An Offer Price</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'images'}>
                                <Stack className={'main-image'}>
                                    <img
                                        src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/banner/banner.webp'}
                                        alt={'main-image'}
                                    />
                                </Stack>
                                <Stack className={'sub-images'}>
                                    {car?.carImages.map((subImg: string) => {
                                        const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
                                        return (
                                            <Stack className={'sub-img-box'} key={subImg}>
                                                <img src={imagePath} alt={'sub-image'} />
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
                            <Stack className={'left-config'}>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'top'}>
                                        <Typography className={'title'}>{t('Car Overview')}</Typography>
                                        <Box className={'under-box'}>
                                            <Typography className={'desc'}>
                                                <PushPinOutlinedIcon className={'icon'} />
                                                {t('Address')}: {car?.carAddress}
                                            </Typography>
                                            {car?.carGroup ? (
                                                <div>
                                                    <span>{car?.carGroup}</span>
                                                </div>
                                            ) : (null)}
                                        </Box>
                                    </Stack>
                                    <Stack className={'bottom'}>
                                        <Stack className={'info-box'}>
                                            <Stack className={'left'}>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/carbody.svg" alt="" />
                                                        {t('Body')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carBody}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/speedb.svg" alt="" />
                                                        {t('Mile')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMileage} km</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/petrolb.svg" alt="" />
                                                        {t('Fuel')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carFuelType}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/yearb.svg" alt="" />
                                                        {t('Year')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carYear}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/transb.svg" alt="" />
                                                        {t('Trans')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carTransmission}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/engineb.svg" alt="" />
                                                        {t('Size')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carEngineSize} L</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/doorb.svg" alt="" />
                                                        {t('Doors')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carDoor}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/cyldb.svg" alt="" />
                                                        {t('Cylinders')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carCylinders}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/driveb.svg" alt="" />
                                                        {t('Drive')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carDriveType}</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack className={'middle'}>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/conb.svg" alt="" />
                                                        {t('Condition')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carType}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <LanguageOutlinedIcon className={'icons'} />
                                                        {t('Made In')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMadeIn}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <CarRepairOutlinedIcon className={'icons'} />
                                                        {t('Brand')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carBrand}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <HandymanOutlinedIcon className={'icons'} />
                                                        {t('Repair')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carRepair} repaires</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <MinorCrashOutlinedIcon className={'icons'} />
                                                        {t('Crush')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carCrush} crushes</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <ApartmentOutlinedIcon className={'icons'} />
                                                        {t('MpgCity')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMpgCity} km</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <AddRoadOutlinedIcon className={'icons'} />
                                                        {t('MpgHw')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMpgHw} km</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <ScaleOutlinedIcon className={'icons'} />
                                                        {t('Weigth')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carWeigth} kg</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <LocalShippingOutlinedIcon className={'icons'} />
                                                        {t('Load Weigth')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carLoadWeight} kg</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack className={'right'}>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/colorb.svg" alt="" />
                                                        {t('Full Fuel')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carFullFuel} L</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <SpeedOutlinedIcon className={'icons'} />
                                                        {t('Max Speed')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMaxSpeed} km/h</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <ElectricBoltOutlinedIcon className={'icons'} />
                                                        {t('100km Speed')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carHundredSpeed} s</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <HeightOutlinedIcon className={'icons'} />
                                                        {t('Heigth')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carHeigth} mm</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <DirectionsCarOutlinedIcon className={'icons'} />
                                                        {t('Width')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carWidth} mm</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <AirportShuttleOutlinedIcon className={'icons'} />
                                                        {t('Length')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carLength} mm</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <DonutSmallOutlinedIcon className={'icons'} />
                                                        {t('Tire')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carTireSize}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <AirlineSeatReclineNormalOutlinedIcon className={'icons'} />
                                                        {t('Seats')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carSeatsUp}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <SwapHorizontalCircleOutlinedIcon className={'icons'} />
                                                        {t('Wheel Base')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carWheelBase} mm</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'prop-desc'}>
                                    <Stack className={'top'}>
                                        <Typography className={'title'}>{t('Car Description')}</Typography>
                                    </Stack>
                                    <Stack className={'bottom'}>
                                        <Typography className={'data'}>
                                            {car?.carDesc}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack className={'floor-plans-config'}>
                                    <Typography className={'title'}>{t('Car Crush Parts')}</Typography>
                                    <Stack className={'image-box'}>
                                        {car?.carFrontBumper === true && (
                                            <div className={'front-bumper'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carBackBumper === true && (
                                            <div className={'rear-bumper'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carBonnet === true && (
                                            <div className={'bonnet'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carTailgate === true && (
                                            <div className={'tailgate'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightFrontWing === true && (
                                            <div className={'rf-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftFrontWing === true && (
                                            <div className={'lf-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightBackWing === true && (
                                            <div className={'rb-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftBackWing === true && (
                                            <div className={'lb-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRoof ?? (
                                            <div className={'roof'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightFrontDoor === true && (
                                            <div className={'rf-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftFrontDoor === true && (
                                            <div className={'lf-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightBackDoor === true && (
                                            <div className={'rb-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftBackDoor === true && (
                                            <div className={'lb-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        <img src={'/img/logo/carbody.jpg'} alt={'image'} />
                                    </Stack>
                                </Stack>
                                <Stack className={'address-config'}>
                                    <Typography className={'title'}>{t('Address')}</Typography>
                                    <Stack className={'map-box'}>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25867.098915951767!2d128.68632810247993!3d35.86402299180927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bba427bf179%3A0x1fc02da732b9072f!2sGeumhogangbyeon-ro%2C%20Dong-gu%2C%20Daegu!5e0!3m2!1suz!2skr!4v1695537640704!5m2!1suz!2skr"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </Stack>
                                </Stack>
                                {commentTotal !== 0 && (
                                    <Stack className={'reviews-config'}>
                                        <Stack className={'filter-box'}>
                                            <Stack className={'review-cnt'}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                                                    <g clipPath="url(#clip0_6507_7309)">
                                                        <path
                                                            d="M15.7183 4.60288C15.6171 4.3599 15.3413 4.18787 15.0162 4.16489L10.5822 3.8504L8.82988 0.64527C8.7005 0.409792 8.40612 0.257812 8.07846 0.257812C7.7508 0.257812 7.4563 0.409792 7.32774 0.64527L5.57541 3.8504L1.14072 4.16489C0.815641 4.18832 0.540363 4.36035 0.438643 4.60288C0.337508 4.84586 0.430908 5.11238 0.676772 5.28084L4.02851 7.57692L3.04025 10.9774C2.96794 11.2275 3.09216 11.486 3.35771 11.636C3.50045 11.717 3.66815 11.7575 3.83643 11.7575C3.98105 11.7575 4.12577 11.7274 4.25503 11.667L8.07846 9.88098L11.9012 11.667C12.1816 11.7979 12.5342 11.7859 12.7992 11.636C13.0648 11.486 13.189 11.2275 13.1167 10.9774L12.1284 7.57692L15.4801 5.28084C15.7259 5.11238 15.8194 4.84641 15.7183 4.60288Z"
                                                            fill="#181A20"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_6507_7309">
                                                            <rect width="15.36" height="12" fill="white" transform="translate(0.398438)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <Typography className={'reviews'}>{commentTotal} {t('reviews')}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack className={'review-list'}>
                                            {propertyComments?.map((comment: Comment) => {
                                                return <Review comment={comment} key={comment?._id} />;
                                            })}
                                            <Box component={'div'} className={'pagination-box'}>
                                                <MuiPagination
                                                    page={commentInquiry.page}
                                                    count={Math.ceil(commentTotal / commentInquiry.limit)}
                                                    onChange={commentPaginationChangeHandler}
                                                    shape="circular"
                                                    color="secondary"
                                                />
                                            </Box>
                                        </Stack>
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
                                            <Typography className={'title'}>{t('Comment Post')}</Typography>
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

                            <Stack className={'right-frame'}>
                                <Stack className={'right-config'}>
                                    <Stack className={'right'}>
                                        <Typography className={'main-title'}>{t('Car Features')}</Typography>
                                        <Typography className={'small-title'}>
                                            <PasswordOutlinedIcon className={'icon'} />
                                            {t('We offer all the features of our car here for you')}
                                        </Typography>
                                        {car?.carAutoBrake === true && (
                                            <Box component={'div'} className={'info'}>
                                                <DonutSmallOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Auto Brake')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carCruiseControl === true && (
                                            <Box component={'div'} className={'info'}>
                                                <TimeToLeaveOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Cruise Control')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carESC === true && (
                                            <Box component={'div'} className={'info'}>
                                                <SurroundSoundOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Car ESC system')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carAutonomuosDrive === true && (
                                            <Box component={'div'} className={'info'}>
                                                <NoCrashOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Autonomuos Drive')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carExteriorLight === true && (
                                            <Box component={'div'} className={'info'}>
                                                <FlashlightOnOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Exterior Light')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carPanoramicSunroof === true && (
                                            <Box component={'div'} className={'info'}>
                                                <LightModeOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Panoramic Sun Roof')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carHeatedSeats === true && (
                                            <Box component={'div'} className={'info'}>
                                                <AirlineSeatLegroomExtraOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Heated Seats')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carCooledSeats === true && (
                                            <Box component={'div'} className={'info'}>
                                                <AcUnitOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Cooled Seats')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carTouchscreenDisplay === true && (
                                            <Box component={'div'} className={'info'}>
                                                <SmartDisplayOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Touch Screen')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carAutoHeadLight == true && (
                                            <Box component={'div'} className={'info'}>
                                                <HighlightOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Auto Head Light')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carStarStop === true && (
                                            <Box component={'div'} className={'info'}>
                                                <PanToolAltOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Keyless Start')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carNoiseCancellation === true && (
                                            <Box component={'div'} className={'info'}>
                                                <NoiseControlOffOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Noise Cancellation')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carRemoteKeyless === true && (
                                            <Box component={'div'} className={'info'}>
                                                <SettingsRemoteOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Remote Keyless')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carLaneDW === true && (
                                            <Box component={'div'} className={'info'}>
                                                <SendOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Lane DW System')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carBlindSpotMonitoring === true && (
                                            <Box component={'div'} className={'info'}>
                                                <VisibilityOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Blind Monitoring')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carRearCrossTrafficAlert === true && (
                                            <Box component={'div'} className={'info'}>
                                                <CommuteOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Rear Traffic Alert')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carApplePlay === true && (
                                            <Box component={'div'} className={'info'}>
                                                <AirplayOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Apple Play')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carAndroidAuto === true && (
                                            <Box component={'div'} className={'info'}>
                                                <CastOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Android Play')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carVoiceControl === true && (
                                            <Box component={'div'} className={'info'}>
                                                <RecordVoiceOverOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Voice Control')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carBluetoothConnectivity == true && (
                                            <Box component={'div'} className={'info'}>
                                                <BluetoothConnectedOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Bluetooth')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carWirelessCharging === true && (
                                            <Box component={'div'} className={'info'}>
                                                <ElectricalServicesOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Charging')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carParkingAssist === true && (
                                            <Box component={'div'} className={'info'}>
                                                <LocalParkingOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Parking Assist')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carSurroundViewCamera === true && (
                                            <Box component={'div'} className={'info'}>
                                                <ThreeSixtyOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('360 Camera')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carFrontSensors === true && (
                                            <Box component={'div'} className={'info'}>
                                                <SkipNextOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Front Sensor')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carRearSensors === true && (
                                            <Box component={'div'} className={'info'}>
                                                <SkipPreviousOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Rear Sensor')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carFrontRecordCamera === true && (
                                            <Box component={'div'} className={'info'}>
                                                <CameraOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Front Camera')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carRearRecordCamera === true && (
                                            <Box component={'div'} className={'info'}>
                                                <FlipCameraAndroidOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Rear Camera')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carHeadsUpDisplay === true && (
                                            <Box component={'div'} className={'info'}>
                                                <LensBlurOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Heads Up Display')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carClimateControl === true && (
                                            <Box component={'div'} className={'info'}>
                                                <ThunderstormOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Climate Control')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carAdjustableSeats === true && (
                                            <Box component={'div'} className={'info'}>
                                                <AirlineSeatReclineExtraOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Adjustable Seats')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carMemorySeats === true && (
                                            <Box component={'div'} className={'info'}>
                                                <PsychologyOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Memory Seats')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carRegenerativeBraking === true && (
                                            <Box component={'div'} className={'info'}>
                                                <BatteryCharging20OutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Regenerative Braking')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carTractionControl === true && (
                                            <Box component={'div'} className={'info'}>
                                                <DeblurOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Traction Control')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carStabilityControl === true && (
                                            <Box component={'div'} className={'info'}>
                                                <VideoStableOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Stability Control')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carHillStartAssist === true && (
                                            <Box component={'div'} className={'info'}>
                                                <TimelineOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Hill Start Assist')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carTirePressureSystem === true && (
                                            <Box component={'div'} className={'info'}>
                                                <TireRepairOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Tire Pressure System')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                        {car?.carPushButton === true && (
                                            <Box component={'div'} className={'info'}>
                                                <TouchAppOutlinedIcon className={'icons'} />
                                                <Typography className={'data'}>{t('Push Button')}</Typography>
                                                <DoneAllOutlinedIcon className={'icons'} />
                                            </Box>
                                        )}
                                    </Stack>
                                </Stack>
                                <Stack className={'right-config'}>
                                    <Stack className={'info-box'}>
                                        <Typography className={'main-title'}>{t('Get More Information')}</Typography>
                                        <Stack className={'image-info'}>
                                            <img
                                                className={'member-image'}
                                                src={
                                                    car?.creatorData?.image
                                                        ? `${REACT_APP_API_URL}/${car?.creatorData?.image}`
                                                        : '/img/profile/defaultUser.svg'
                                                }
                                            />
                                            <Stack className={'name-phone-listings'}>
                                                <Link href={`/member?memberId=${car?.creatorData?._id}`}>
                                                    <Typography className={'name'}>{car?.creatorData?.titleNick}</Typography>
                                                </Link>
                                                <Stack className={'phone-number'}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                        <g clipPath="url(#clip0_6507_6774)">
                                                            <path
                                                                d="M16.2858 10.11L14.8658 8.69C14.5607 8.39872 14.1551 8.23619 13.7333 8.23619C13.3115 8.23619 12.9059 8.39872 12.6008 8.69L12.1008 9.19C11.7616 9.528 11.3022 9.71778 10.8233 9.71778C10.3444 9.71778 9.88506 9.528 9.54582 9.19C9.16082 8.805 8.91582 8.545 8.67082 8.29C8.42582 8.035 8.17082 7.76 7.77082 7.365C7.43312 7.02661 7.24347 6.56807 7.24347 6.09C7.24347 5.61193 7.43312 5.15339 7.77082 4.815L8.27082 4.315C8.41992 4.16703 8.53822 3.99099 8.61889 3.79703C8.69956 3.60308 8.741 3.39506 8.74082 3.185C8.739 2.76115 8.57012 2.35512 8.27082 2.055L6.85082 0.625C6.44967 0.225577 5.9069 0.000919443 5.34082 0C5.06197 0.000410905 4.78595 0.0558271 4.52855 0.163075C4.27116 0.270322 4.03745 0.427294 3.84082 0.625L2.48582 1.97C1.50938 2.94779 0.960937 4.27315 0.960938 5.655C0.960937 7.03685 1.50938 8.36221 2.48582 9.34C3.26582 10.12 4.15582 11 5.04082 11.92C5.92582 12.84 6.79582 13.7 7.57082 14.5C8.5484 15.4749 9.87269 16.0224 11.2533 16.0224C12.6339 16.0224 13.9582 15.4749 14.9358 14.5L16.2858 13.15C16.6828 12.7513 16.9073 12.2126 16.9108 11.65C16.9157 11.3644 16.8629 11.0808 16.7555 10.8162C16.6481 10.5516 16.4884 10.3114 16.2858 10.11ZM15.5308 12.375L15.3858 12.5L13.9358 11.045C13.8875 10.99 13.8285 10.9455 13.7623 10.9142C13.6961 10.8829 13.6243 10.8655 13.5511 10.8632C13.478 10.8608 13.4051 10.8734 13.337 10.9003C13.269 10.9272 13.2071 10.9678 13.1554 11.0196C13.1036 11.0713 13.0631 11.1332 13.0361 11.2012C13.0092 11.2693 12.9966 11.3421 12.999 11.4153C13.0014 11.4884 13.0187 11.5603 13.05 11.6265C13.0813 11.6927 13.1258 11.7517 13.1808 11.8L14.6558 13.275L14.2058 13.725C13.4279 14.5005 12.3743 14.936 11.2758 14.936C10.1774 14.936 9.12372 14.5005 8.34582 13.725C7.57582 12.955 6.70082 12.065 5.84582 11.175C4.99082 10.285 4.06582 9.37 3.28582 8.59C2.51028 7.81209 2.0748 6.75845 2.0748 5.66C2.0748 4.56155 2.51028 3.50791 3.28582 2.73L3.73582 2.28L5.16082 3.75C5.26027 3.85277 5.39648 3.91182 5.53948 3.91417C5.68247 3.91651 5.82054 3.86196 5.92332 3.7625C6.02609 3.66304 6.08514 3.52684 6.08748 3.38384C6.08983 3.24084 6.03527 3.10277 5.93582 3L4.43582 1.5L4.58082 1.355C4.67935 1.25487 4.79689 1.17543 4.92654 1.12134C5.05619 1.06725 5.19534 1.03959 5.33582 1.04C5.61927 1.04085 5.89081 1.15414 6.09082 1.355L7.51582 2.8C7.61472 2.8998 7.6704 3.0345 7.67082 3.175C7.67088 3.24462 7.65722 3.31358 7.63062 3.37792C7.60403 3.44226 7.56502 3.50074 7.51582 3.55L7.01582 4.05C6.47844 4.58893 6.17668 5.31894 6.17668 6.08C6.17668 6.84106 6.47844 7.57107 7.01582 8.11C7.43582 8.5 7.66582 8.745 7.93582 9C8.20582 9.255 8.43582 9.53 8.83082 9.92C9.36974 10.4574 10.0998 10.7591 10.8608 10.7591C11.6219 10.7591 12.3519 10.4574 12.8908 9.92L13.3908 9.42C13.4929 9.32366 13.628 9.26999 13.7683 9.26999C13.9087 9.26999 14.0437 9.32366 14.1458 9.42L15.5658 10.84C15.6657 10.9387 15.745 11.0563 15.7991 11.1859C15.8532 11.3155 15.8809 11.4546 15.8808 11.595C15.8782 11.7412 15.8459 11.8853 15.7857 12.0186C15.7255 12.1518 15.6388 12.2714 15.5308 12.37V12.375Z"
                                                                fill="#181A20"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_6507_6774">
                                                                <rect width="16" height="16" fill="white" transform="translate(0.9375)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <Typography className={'number'}>{car?.creatorData?.phone}</Typography>
                                                </Stack>
                                                <Typography className={'listings'}>{t('View Detail')}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>{t('Name')}</Typography>
                                        <input type={'text'} placeholder={'Enter your name'} />
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>{t('Phone')}</Typography>
                                        <input type={'text'} placeholder={'Enter your phone'} />
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>{t('Email')}</Typography>
                                        <input type={'text'} placeholder={'creativelayers088'} />
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>{t('Message')}</Typography>
                                        <textarea placeholder={'Hello, I am interested in \n' + '[your posted car]'}></textarea>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Button className={'send-message'}>
                                            <Typography className={'title'}>{t('Send Message')}</Typography>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                <g clipPath="url(#clip0_6975_593)">
                                                    <path
                                                        d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6975_593">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        {destinationCars?.length !== 0 && (
                            <Stack className={'similar-properties-config'}>
                                <Stack className={'title-pagination-box'}>
                                    <Stack className={'title-box'}>
                                        <Typography className={'main-title'}>{t('Destination Cars')}</Typography>
                                        <Typography className={'sub-title'}>{t('There are also similar cars available here')}</Typography>
                                    </Stack>
                                    <Stack className={'pagination-box'}>
                                        <WestIcon className={'swiper-similar-prev'} />
                                        <div className={'swiper-similar-pagination'}></div>
                                        <EastIcon className={'swiper-similar-next'} />
                                    </Stack>
                                </Stack>
                                <Stack className={'cards-box'}>
                                    <Swiper
                                        className={'similar-homes-swiper'}
                                        slidesPerView={'auto'}
                                        spaceBetween={35}
                                        modules={[Autoplay, Navigation, Pagination]}
                                        navigation={{
                                            nextEl: '.swiper-similar-next',
                                            prevEl: '.swiper-similar-prev',
                                        }}
                                        pagination={{
                                            el: '.swiper-similar-pagination',
                                        }}
                                    >
                                        {destinationCars?.map((car: Car) => {
                                            return (
                                                <SwiperSlide className={'similar-homes-slide'} key={car?.carTitle}>
                                                    <RecommendedCarCard car={car} likeCarHandler={likeCarHandler} saveCarHandler={saveCarHandler} key={car?._id} />
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </div>
            </div>
        );
    }
};

CarDetailList.defaultProps = {
    initialComment: {
        page: 1,
        limit: 5,
        sort: 'createdAt',
        direction: 'DESC',
        search: {
            commentRefId: '',
        },
    },
};

export default withLayoutBasic(CarDetailList);