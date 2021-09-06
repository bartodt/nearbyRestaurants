import React, { FC } from 'react'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getReviews } from '../../app/reducer'
import { Reviews } from '../../types'
import Review from './Review'

type Props = {
    reviews: Reviews
    navigation: any
}

const ReviewsList: FC<Props> = () => {
    const reviewList = useSelector(getReviews)


    const renderItem = ({ item }: { item: Reviews }) => {
        return (
            <Review
                key={item.time}
                author_name={item.author_name}
                profile_photo_url={item.profile_photo_url}
                rating={item.rating}
                text={item.text}
                relative_time_description={item.relative_time_description}
            />
        )
    }


    return (<View>
        {reviewList.length > 0 && <FlatList
            data={reviewList}
            renderItem={renderItem}
            keyExtractor={(item: Reviews) => item.time.toString()}
        />}

    </View>)
}



export default ReviewsList