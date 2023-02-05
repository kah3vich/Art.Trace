import Document, { Head, Html, Main, NextScript } from 'next/document';

interface DocumentProps {
	styleTags?: any;
}

class MyDocument extends Document<DocumentProps> {
	render() {
		return (
			<Html>
				<Head>
					<link rel='icon' type='image/png' href='/favicon.ico' />
					<link rel='apple-touch-icon' href='/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css'
					/>
					{/* eslint-disable-next-line @next/next/no-sync-scripts */}
					<script src='https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js'></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
