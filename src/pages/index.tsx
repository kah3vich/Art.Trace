import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GRAPHQL_URL } from '../constant/env';
import { addUser } from '../store/users';

import { gsap, Power2, TimelineMax } from 'gsap';
import 'swiper/css';
import 'swiper/css/pagination';

const client = new ApolloClient({
	uri: GRAPHQL_URL,
	cache: new InMemoryCache(),
});

export async function getStaticProps() {
	let data = null;
	await client
		.query({
			query: gql`
				query GetGoods {
					goods {
						id
					}
				}
			`,
		})
		.then(result => (data = result));

	if (!data) {
		return null;
	}

	return {
		props: { dataList: data },
	};
}

export default function Home({ dataList }: any) {
	// create an array of elements that you want to animate
	var elements = typeof window !== 'undefined' ? document.querySelectorAll('.element') : undefined;

	const [activeSlide, setActiveSlide] = useState<any>({
		active: null,
		prev: null,
		prevRez: null,
		next: null,
		nextRez: null,
	});

	useEffect(() => {
		console.log('activeSlide    ', activeSlide);
	}, [activeSlide]);

	// set the initial position of all elements to the same point
	useEffect(() => {
		elements?.forEach(element => {
			if (element.getAttribute('class') === 'swiper-slide element swiper-slide-active') {
				setActiveSlide({
					active: element,
					prev: activeSlide.prev,
					prevRez: activeSlide.prevRez,
					next: activeSlide.next,
					nextRez: activeSlide.nextRez,
				});
			}
			// // right
			// if (element.getAttribute('aria-index') === `${activeSlide - 1}`) {
			// 	//@ts-ignore
			// 	element.style.top = '0px';
			// 	//@ts-ignore
			// 	element.style.right = '50%';
			// 	//@ts-ignore
			// 	element.style.transform = 'translate(-50%, 0)';
			// }

			// if (element.getAttribute('aria-index') === `${activeSlide - 2}`) {
			// 	//@ts-ignore
			// 	element.style.top = '0px';
			// 	//@ts-ignore
			// 	element.style.right = '50%';
			// 	//@ts-ignore
			// 	element.style.transform = 'translate(-50%, 0)';
			// }
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			elements?.forEach(element => {
				if (
					Number(activeSlide.active?.getAttribute('data-swiper-slide-index')) - 1 ===
					Number(element.getAttribute('data-swiper-slide-index'))
				) {
					// //@ts-ignore
					// element.style.opacity = '0.5';
					// //@ts-ignore
					// element.style.left = '14%';
					console.log('element    ', element);

					setActiveSlide({
						active: activeSlide.active,
						prev: element,
						prevRez: activeSlide.prevRez,
						next: activeSlide.next,
						nextRez: activeSlide.nextRez,
					});
				}
				if (
					Number(activeSlide.active?.getAttribute('data-swiper-slide-index')) + 1 ===
					Number(element.getAttribute('data-swiper-slide-index'))
				) {
					// //@ts-ignore
					// element.style.opacity = '0.5';
					// //@ts-ignore
					// element.style.left = '-14%';

					setActiveSlide({
						active: activeSlide.active,
						prev: activeSlide.prev,
						prevRez: activeSlide.prevRez,
						next: element,
						nextRez: activeSlide.nextRez,
					});
				}

				if (
					Number(activeSlide.active?.getAttribute('data-swiper-slide-index')) - 2 ===
					Number(element.getAttribute('data-swiper-slide-index'))
				) {
					// //@ts-ignore
					// element.style.opacity = '0.1';
					// //@ts-ignore
					// element.style.left = '28%';

					setActiveSlide({
						active: activeSlide.active,
						prev: activeSlide.prev,
						prevRez: element,
						next: activeSlide.next,
						nextRez: activeSlide.nextRez,
					});
				}
				if (
					Number(activeSlide.active?.getAttribute('data-swiper-slide-index')) + 2 ===
					Number(element.getAttribute('data-swiper-slide-index'))
				) {
					// //@ts-ignore
					// element.style.opacity = '0.1';
					// //@ts-ignore
					// element.style.left = '-28%';

					setActiveSlide({
						active: activeSlide.active,
						prev: activeSlide.prev,
						prevRez: activeSlide.prevRez,
						next: activeSlide.next,
						nextRez: element,
					});
				}
			});
		}, 500);
	}, []);

	// create a timeline to animate the elements
	var tl = new TimelineMax();

	// // stagger the animation of each element so they appear one after another
	var stagger = 0.1;
	useEffect(() => {
		// elements?.forEach(function (element) {
		// 	tl.from(
		// 		element,
		// 		1,
		// 		{
		// 			left: 0,
		// 			opacity: 1,
		// 			ease: Power2.easeOut,
		// 		},
		// 		stagger,
		// 	);
		// });
		tl.to(
			activeSlide.active,
			1,
			{
				left: '-30%',
				opacity: 1,
				ease: Power2.easeOut,
			},
			stagger,
		);
		gsap.registerPlugin();
	});

	const onClick = useCallback(() => {
		addUser({
			id: 1,
			name: '123',
		});
	}, []);

	return (
		<ApolloProvider client={client}>
			<Swiper
				slidesPerView={7}
				spaceBetween={0}
				centeredSlides={true}
				loop={true}
				initialSlide={15}
				freeMode={true}
				observeParents={true}
				observeSlideChildren={true}
				observer={true}
				speed={2000}
				pagination={{
					clickable: true,
				}}
				modules={[FreeMode, Pagination]}
				className='mySwiper'
			>
				<SwiperSlide className='element'>0</SwiperSlide>
				<SwiperSlide className='element'>1</SwiperSlide>
				<SwiperSlide className='element'>2</SwiperSlide>
				<SwiperSlide className='element'>3</SwiperSlide>
				<SwiperSlide className='element'>4</SwiperSlide>
				<SwiperSlide className='element'>5</SwiperSlide>
				<SwiperSlide className='element'>6</SwiperSlide>
				<SwiperSlide className='element'>7</SwiperSlide>
				<SwiperSlide className='element'>8</SwiperSlide>
				<SwiperSlide className='element'>9</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
				<SwiperSlide className='element'>20</SwiperSlide>
			</Swiper>
			{/* <Link passHref href='/user' onClick={onClick}>
				123
			</Link>
			{dataList.data.goods.map((el: any) => (
				<div key={el.id}>{el.id}</div>
			))} */}
		</ApolloProvider>
	);
}
