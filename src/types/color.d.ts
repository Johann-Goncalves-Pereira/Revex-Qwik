// Represents a hexadecimal digit from 0 to 9
type HexNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// Represents a hexadecimal letter from A to F
type HexLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
// Represents a 3-digit hexadecimal color code
type Hex3 = `${HexChar}${HexChar}${HexChar}`
// Represents a 6-digit hexadecimal color code
type Hex6 = `${Hex3}${Hex3}`
// Represents an 8-digit hexadecimal color code with alpha
type Hex8 = `${Hex6}${HexChar}${HexChar}`
// Union type for 3, 6, or 8-digit hexadecimal color codes
type Hex = Hex3 | Hex6 | Hex8

interface OKLCH {
	l: number // Lightness: 0 to 1
	c: number // Chroma: 0 to 0.4
	h: number // Hue: 0 to 360
	a?: number // Alpha: 0 to 1
}

interface SRGB {
	r: number // Red: 0 to 255
	g: number // Green: 0 to 255
	b: number // Blue: 0 to 255
	a?: number // Alpha: 0 to 1
}
