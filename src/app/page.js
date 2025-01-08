'use client'

import { Pixelify_Sans } from 'next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import '../styles/globals.css'

const pixelifySans = Pixelify_Sans({
	subsets: ['latin'],
	weight: ['400'],
	display: 'swap',
})

export default function Home() {
	const [charRNN, setCharRNN] = useState(null)
	const [isGenerating, setIsGenerating] = useState(false)
	const [poem, setPoem] = useState(
		'Click the image to summon a whimsically gothic poem...'
	)
	const [modelLoaded, setModelLoaded] = useState(false)
	const [ml5Loaded, setMl5Loaded] = useState(false)

	// Vocabulary for fallback poem generation
	const vocabulary = {
		adjectives: [
			'gentle',
			'radiant',
			'mystical',
			'enchanted',
			'delicate',
			'luminous',
			'ethereal',
			'dreamy',
			'starlit',
			'moonlit',
			'velvet',
			'crystalline',
			'shimmering',
			'iridescent',
			'gossamer',
			'twilight',
			'midnight',
			'dawn-touched',
		],
		nouns: [
			'heart',
			'spirit',
			'soul',
			'dream',
			'light',
			'angel',
			'star',
			'flower',
			'butterfly',
			'fairy',
			'moonbeam',
			'crystal',
			'melody',
			'whisper',
			'dance',
			'shadow',
			'chamber',
			'garden',
		],
		verbs: [
			'glides',
			'dances',
			'floats',
			'sparkles',
			'twirls',
			'gleams',
			'shimmers',
			'radiates',
			'glows',
			'whispers',
			'sings',
			'dreams',
			'enchants',
			'illuminates',
			'weaves',
			'embraces',
		],
		locations: [
			'in moonlit gardens fair',
			'through crystal chambers bright',
			'midst shadows soft and sweet',
			'where starlight gently falls',
			'in twilight tender glow',
			'through mystic halls of light',
			'beneath the silver moon',
			'among the dreaming flowers',
			'within enchanted bowers',
			'through veils of midnight blue',
		],
		compliments: [
			'precious heart of gold',
			'spirit pure and bright',
			'soul of morning light',
			'gentle dreaming star',
			'fairy of delight',
			'angel of the night',
			'keeper of sweet dreams',
			"bringer of joy's gleams",
			"bearer of love's light",
			'dancer in starlight',
		],
	}

	const getRandomElement = (array) =>
		array[Math.floor(Math.random() * array.length)]

	const generatePoemLine = () => {
		const patterns = [
			() =>
				`${getRandomElement(vocabulary.adjectives)} ${getRandomElement(
					vocabulary.nouns
				)} ${getRandomElement(vocabulary.verbs)} ${getRandomElement(
					vocabulary.locations
				)}`,
			() =>
				`Like ${getRandomElement(vocabulary.adjectives)} ${getRandomElement(
					vocabulary.nouns
				)}, thou ${getRandomElement(vocabulary.verbs)} ${getRandomElement(
					vocabulary.locations
				)}`,
			() =>
				`Oh ${getRandomElement(vocabulary.compliments)}, ${getRandomElement(
					vocabulary.locations
				)}`,
			() =>
				`Through ${getRandomElement(
					vocabulary.adjectives
				)} night, thy ${getRandomElement(vocabulary.nouns)} ${getRandomElement(
					vocabulary.verbs
				)}`,
			() =>
				`Behold! ${getRandomElement(vocabulary.adjectives)} ${getRandomElement(
					vocabulary.nouns
				)} that ${getRandomElement(vocabulary.verbs)}`,
		]
		return getRandomElement(patterns)()
	}

	const generateTitle = () => {
		const patterns = [
			() =>
				`To a ${getRandomElement(vocabulary.adjectives)} ${getRandomElement(
					vocabulary.compliments
				)}`,
			() =>
				`The ${getRandomElement(vocabulary.adjectives)} ${getRandomElement(
					vocabulary.nouns
				)}`,
			() => `Upon Meeting a ${getRandomElement(vocabulary.compliments)}`,
			() => `Ode to ${getRandomElement(vocabulary.adjectives)} Grace`,
		]
		return getRandomElement(patterns)()
	}

	const generateFallbackPoem = () => {
		const title = generateTitle()
		const lines = []

		// Generate 4-6 unique lines
		const numLines = Math.floor(Math.random() * 3) + 4
		const usedPatterns = new Set()

		for (let i = 0; i < numLines; i++) {
			let line
			let attempts = 0
			do {
				line = generatePoemLine()
				attempts++
			} while (usedPatterns.has(line) && attempts < 10)

			usedPatterns.add(line)
			lines.push(line)
		}

		// Add a Poe-inspired ending
		const endings = [
			'Forever more, in light divine!',
			'Till stars fade from above!',
			'Through endless dreams of thee!',
			"In beauty's eternal dance!",
			'Where love and shadows entwine!',
		]

		return `"${title}"\n\n${lines.join(',\n')},\n${getRandomElement(endings)}`
	}

	// Initialize ML5 model
	useEffect(() => {
		if (ml5Loaded && typeof window !== 'undefined' && window.ml5) {
			const initModel = async () => {
				try {
					console.log('ML5 version:', window.ml5.version)
					const modelPath = '/models/gothic'

					if (!window.ml5.charRNN) {
						console.error('charRNN not found in ml5')
						setPoem('Error: Model not available')
						return
					}

					const rnn = await window.ml5.charRNN(modelPath, () => {
						console.log('Model loaded successfully')
						setModelLoaded(true)
					})

					setCharRNN(rnn)
				} catch (error) {
					console.error('Error initializing model:', error)
					setPoem('Error: Could not initialize the model')
				}
			}

			initModel()
		}
	}, [ml5Loaded])

	const generatePoem = async () => {
		setIsGenerating(true)
		setPoem('Summoning dark inspiration...')

		try {
			if (modelLoaded && charRNN) {
				const result = await charRNN.generate({
					seed: 'In shadows deep',
					temperature: 0.7,
					length: 100,
				})
				setPoem(formatPoem(result.sample))
			} else {
				setPoem(generateFallbackPoem())
			}
		} catch (error) {
			console.error('Error generating poem:', error)
			setPoem(generateFallbackPoem())
		} finally {
			setIsGenerating(false)
		}
	}

	const formatPoem = (text) => {
		return text
			.split(/[.!?]\s/)
			.filter((line) => line.length > 0)
			.map((line) => line.trim())
			.map((line) => line.charAt(0).toUpperCase() + line.slice(1))
			.join('\n')
	}

	return (
		<>
			<Head>
				<title>bloom</title>
			</Head>

			<Script
				src='https://unpkg.com/ml5@0.12.2/dist/ml5.min.js'
				strategy='beforeInteractive'
				onLoad={() => setMl5Loaded(true)}
				onError={(e) => {
					console.error('Error loading ml5:', e)
					setPoem('Error: Could not load ML library')
				}}
			/>

			<div className={`container ${pixelifySans.className}`}>
				<Image
					id='poemImage'
					src='/img/bloom.png'
					alt='flower image'
					width={500}
					height={500}
					className='background-image'
					onClick={generatePoem}
				/>
				<div id='poem'>
					{isGenerating ? (
						<span className='loading'>Weaving moonlit verses...</span>
					) : (
						<pre className='poem-text'>{poem}</pre>
					)}
				</div>
			</div>
		</>
	)
}
