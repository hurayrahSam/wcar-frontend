import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Article } from '../../types/article/article';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../../../apollo/user/query';
import { ArticleCategory } from '../../enums/article.enum';
import { T } from '../../types/common';
import { useRouter } from 'next/router';
import { REACT_APP_API_URL } from '../../config';
import { useTranslation } from 'next-i18next';

interface ArticleProps {
	article: Article;
}
const EventCard = (props: ArticleProps) => {
	const { article } = props;
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const device = useDeviceDetect();
	const pushDetailhandler = async (articleId: string) => {
		await router.push({ pathname: '/community/detail', query: { id: articleId } })
	};

	const backgroundImageUrl = article?.articleImage
		? `${REACT_APP_API_URL}/${article.articleImage}`
		: "/img/default-image.jpg";

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				onClick={() => pushDetailhandler(article?._id)}
			>
				<Stack className={'img'}
					style={{
						backgroundImage: `url(${backgroundImageUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				></Stack>
				<Box component={'div'} className={'info'}>
					<strong>{article?.articleTitle}</strong>
					<span>{article?.creatorData?.titleNick}</span>
				</Box>
			</Stack>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [topArticle, setTopArticle] = useState<Article[]>([]);


	/** APOLLO REQUESTS **/

	const {
		loading: getArticlesLoading,
		data: getArticlesData,
		error: getArticlesError,
		refetch: getArticlesRefetch
	} = useQuery(GET_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input:
			{
				page: 1,
				limit: 3,
				direction: 'DESC',
				sort: 'createdAt',
				search: {
					articleCategory: ArticleCategory.EVENT
				},
			}
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopArticle(data?.getArticles?.list);
		},
	});

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'white'}>{t('Auto Events')}</span>
							<p className={'white'}>{t('Events waiting your attention!')}</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{topArticle.map((article: Article) => {
							return <EventCard article={article} key={article?._id} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
