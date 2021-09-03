import React, { FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Restaurant } from '../../types'
import { Card } from "./Card"
import { getList } from '../../app/reducer'
import { useSelector } from 'react-redux'


interface OwnProps {
    navigation: any;
    route: any
}

type Props = OwnProps;


const CardList: FC<Props> = ({ navigation }) => {
    const arrayList = useSelector(getList)

    const getReviews = () => {
        navigation.navigate("Reviews")
    }

    const renderItem = ({ item }: { item: Restaurant }) => {
        return (
            <Card
                photo_url={item.photo_url}
                icon={item.icon}
                name={item.name}
                rating={item.rating}
                user_ratings_total={item.user_ratings_total}
                vicinity={item.vicinity}
                opening_hours={item.opening_hours}
                action={getReviews}
                geometry={item.geometry}
            />
        )
    }

    return (
        <View>
            <FlatList
                data={arrayList}
                renderItem={renderItem}
                keyExtractor={(item: Restaurant) => item.name}
            />
        </View>
    )
}

export default CardList
