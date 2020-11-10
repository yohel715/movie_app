import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontsNames } from '../utils/fonts';

const TextCustom = ({ fontFamily, ...props }) => {
	let textStyle;

	switch (fontFamily) {
		case 'Regular':
			textStyle = styles.regular;
			break;
		case 'Bold':
			textStyle = styles.bold;
			break;
		case 'Fancy':
			textStyle = styles.fancy;
			break;
		default:
			textStyle = styles.regular;
			break;
	}

	return (
		<Text {...props} style={[props.style, textStyle]}>
			{props.children}
		</Text>
	);
};

const styles = StyleSheet.create({
	regular: {
		fontFamily: fontsNames.REGULAR,
	},
	bold: {
		fontFamily: fontsNames.BOLD,
	},
	fancy: {
		fontFamily: fontsNames.FANCY,
	},
});

export default TextCustom;
