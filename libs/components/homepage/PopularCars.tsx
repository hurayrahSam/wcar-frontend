import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';
import { GET_CARS, GET_PRODUCTS } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { CarsInquiry } from '../../types/car/car.input';
import { Car } from '../../types/car/car';
import PopularCarCard from './PopularCarCard';
import { ProductsInquiry } from '../../types/product/product.input';
import { Product } from '../../types/product/product';
import ProductCard from '../shop/ProductCard';
import { t } from 'i18next';
import { useTranslation } from 'next-i18next';

interface PopularProductsProps {
	initialInput: ProductsInquiry;
}

const PopularCars = (props: PopularProductsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [popularProducts, setPopularProducts] = useState<Product[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'network-only',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setPopularProducts(data?.getProducts?.list);
		},
	});
	/** HANDLERS **/

	if (!popularProducts) return null;

	if (device === 'mobile') {
		return <div>WCAR POPULAR CARS MOBILE</div>;
	} else {
		return (
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/shop'}>
									<span>{t('See All Products')}</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{popularProducts.map((product: Product) => {
							return (
								<ProductCard product={product} key={product?._id} />
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default PopularCars;
