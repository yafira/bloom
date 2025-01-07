'use client'

import Head from 'next/head'
import { useEffect } from 'react'
import Image from 'next/image'
import { Pixelify_Sans } from 'next/font/google'
import '../styles/globals.css'

// Import the Pixelify Sans font
const pixelifySans = Pixelify_Sans({
	subsets: ['latin'],
	weight: '400', // Adjust based on your needs
	style: 'normal',
})

export default function Home() {
	useEffect(() => {
		const darkAdjectives = [
			'shadowed',
			'mysterious',
			'enchanted',
			'moonlit',
			'twilight',
			'midnight',
			'velvet',
			'ethereal',
			'spectral',
			'darkened',
			'haunted',
			'dreaming',
			'glimmering',
			'starry',
			'silken',
			'phantom',
			'nocturnal',
			'obscure',
		]
		const compliments = [
			'luminous soul',
			'brilliant mind',
			'kind heart',
			'gentle spirit',
			'wise dreamer',
			'resilient heart',
			'courageous spirit',
			'radiant aura',
			'hopeful gaze',
			'charming smile',
			'compassionate being',
			'heart of gold',
			'soft voice',
			'graceful presence',
			'pure light',
			'glowing essence',
			'magical heart',
		]
		const gothicNouns = [
			'chamber',
			'mansion',
			'garden',
			'tower',
			'forest',
			'castle',
			'sanctuary',
			'domain',
			'realm',
			'kingdom',
			'cathedral',
			'grove',
			'ruins',
			'hall',
			'nook',
			'crypt',
			'shadowland',
			'thicket',
		]
		const poeticVerbs = [
			'whispers',
			'dances',
			'wanders',
			'dreams',
			'lurks',
			'prances',
			'floats',
			'glides',
			'haunts',
			'beckons',
			'slumbers',
			'frolics',
			'glimmers',
			'drifts',
			'sings',
			'soars',
			'weaves',
			'glows',
		]
		const darkImagery = [
			'in shadows deep',
			'beneath pale moonlight',
			'through misty veils',
			"in twilight's embrace",
			'amidst ancient stones',
			'through darkened halls',
			'beneath starry skies',
			'in forgotten realms',
			'within ghostly glows',
			'through mist and fog',
			'in the quiet of the grove',
			'where shadows dance',
		]

		function getRandomElement(array) {
			return array[Math.floor(Math.random() * array.length)]
		}

		function generatePoem() {
			const poemElement = document.getElementById('poem')
			poemElement.innerHTML =
				'<span class="loading">Loading your magical poem...</span>'

			setTimeout(() => {
				let poem = []
				poem.push(
					`"${getRandomElement(darkAdjectives)} ${getRandomElement(
						compliments
					)}"\n`
				)

				const numLines = Math.floor(Math.random() * 2) + 3

				poem.push(generateOpeningLine())

				for (let i = 0; i < numLines - 2; i++) {
					poem.push(generateLine())
				}

				poem.push(generateEndingLine())

				poemElement.innerHTML = poem.join('<br/>')
			}, 500)
		}

		function generateOpeningLine() {
			const patterns = [
				() => `deep in the ${getRandomElement(gothicNouns)} of endless night,`,
				() =>
					`lo! a ${getRandomElement(compliments)} ${getRandomElement(
						poeticVerbs
					)} ${getRandomElement(darkImagery)},`,
				() =>
					`upon a midnight dreary, a ${getRandomElement(
						compliments
					)} bright and cheery,`,
				() =>
					`in chambers ${getRandomElement(
						darkAdjectives
					)}, where shadows creep,`,
			]
			return getRandomElement(patterns)()
		}

		function generateLine() {
			const patterns = [
				() =>
					`a ${getRandomElement(darkAdjectives)} ${getRandomElement(
						compliments
					)} ${getRandomElement(poeticVerbs)} with grace,`,
				() =>
					`through ${getRandomElement(
						darkAdjectives
					)} halls of ${getRandomElement(gothicNouns)} vast,`,
				() =>
					`where brilliance dares to ${getRandomElement(
						poeticVerbs
					)} and play,`,
				() =>
					`in ${getRandomElement(
						darkAdjectives
					)} dreams that ${getRandomElement(poeticVerbs)} and sway,`,
			]
			return getRandomElement(patterns)()
		}

		function generateEndingLine() {
			const endings = [
				"till dawn's light breaks the spell at last.",
				'forever more, or nevermore!',
				'in darkness sweet, where shadows meet.',
				'through endless night, a precious sight.',
				'where hope dwells in gothic spells.',
				'in darkness deep, such secrets keep.',
				'and with your light, you shine so bright.',
				'through every storm, your strength takes flight.',
				'let your spirit soar, for you are more.',
			]
			return getRandomElement(endings)
		}

		const image = document.getElementById('poemImage')
		if (image) {
			image.addEventListener('click', generatePoem)
		}
	}, [])

	return (
		<>
			<Head>
				<title>Bloom</title>
				{/* No longer needed to link to Google Font as it's being imported via next/font */}
			</Head>
			<div className={`container ${pixelifySans.className}`}>
				<Image
					id='poemImage'
					src='/img/bloom.png'
					alt='flower image'
					width={500}
					height={500}
					className='background-image'
				/>
				<div id='poem'>
					Click the image to summon a whimsical poem of darkness and light...
				</div>
			</div>
		</>
	)
}
