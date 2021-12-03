import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Appbar, Title} from 'react-native-paper'


function HeaderNotes({ titleText}) {
		
	return (
		<Appbar.Header style={styles.headerContainer}>
			<View style={styles.container}>
				<Title style={styles.title}>{titleText}</Title>
			</View>
		</Appbar.Header>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#17202a',
		paddingTop: 30,
		height: 80
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		color: '#a3c2fa'
	}
})

export default HeaderNotes