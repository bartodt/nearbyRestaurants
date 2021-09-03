import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { Reviews } from '../../types'

type Props = {
    reviews: Reviews
    navigation: any
}

const ReviewsList: FC<Props> = () => {

    return (<View>
        <Text>Reviews</Text>
    </View>)
}

export default ReviewsList