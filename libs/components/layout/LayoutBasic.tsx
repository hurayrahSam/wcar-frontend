import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/cars':
					title = 'Car Search';
					desc = 'We are glad to see you again!';
					bgImage = '/img/logo/bannercar4.webp';
					break;
				case '/cars/detail':
					title = 'Car Search';
					desc = 'We are glad to see you again!';
					bgImage = '/img/logo/bannercar13.webp';
					break;
				case '/shop':
					title = 'Product Search';
					desc = 'We are glad to see you again!';
					bgImage = '/img/logo/banner14.webp';
					break;
				case '/shop/detail':
					title = 'Product Search';
					desc = 'We are glad to see you again!';
					bgImage = '/img/logo/bannercar8.webp';
					break;
				case '/agent':
					title = 'Agents';
					desc = 'Car / For Rent';
					bgImage = '/img/logo/bannercar7.webp';
					break;
				case '/agent/detail':
					title = 'Agent Page';
					desc = 'Car / For Rent';
					bgImage = '/img/logo/bannercar6.webp';
					break;
				case '/dealers':
					title = 'Dealers';
					desc = 'Car / For Rent';
					bgImage = '/img/logo/bannercar8.webp';
					break;
				case '/dealers/detail':
					title = 'Dealer Page';
					desc = 'Car / For Rent';
					bgImage = '/img/logo/bannercar9.webp';
					break;
				case '/service':
					title = 'Services';
					desc = 'Service / For Rent';
					bgImage = '/img/logo/bannercar11.webp';
					break;
				case '/service/detail':
					title = 'Service Page';
					desc = 'Service / For Rent';
					bgImage = '/img/logo/bannercar12.webp';
					break;
				case '/mypage':
					title = 'my page';
					desc = 'Home / For Rent';
					bgImage = '/img/logo/bannercar4.webp';
					break;
				case '/community':
					title = 'Community';
					desc = 'Home / For Rent';
					bgImage = '/img/logo/bannercar6.webp';
					break;
				case '/community/detail':
					title = 'Community Detail';
					desc = 'Home / For Rent';
					bgImage = '/img/logo/bannercar8.webp';
					break;
				case '/cs':
					title = 'CS';
					desc = 'We are glad to see you again!';
					bgImage = '/img/logo/bannercar9.webp';
					break;
				case '/account/join':
					title = 'Login/Signup';
					desc = 'Authentication Process';
					bgImage = '/img/logo/bannercar11.webp';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
					desc = 'Home / For Rent';
					bgImage = '/img/logo/bannercar2.webp';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return <div>WCAR MOBILE</div>;
		} else {
			return (
				<>
					<Head>
						<title>WCar</title>
						<meta name={'title'} content={`WCar`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								backgroundImage: `url(${memoizedValues.bgImage})`,
								backgroundSize: 'cover',
								boxShadow: 'inset 10px 40px 150px 40px rgb(24 22 36)',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Chat />

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
