import React, { FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { RestaurantCard } from '../../types'
import { Card } from "./Card"
import { getList, setReviews } from '../../app/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getGoogleReviews } from '../../services'


interface OwnProps {
    navigation: any;
    route: any
}

type Props = OwnProps;


const CardList: FC<Props> = ({ navigation }) => {
    const restaurantList = useSelector(getList)
    const dispatch = useDispatch()

    const goToReviews = async (id: string) => {
        let reviews = await getGoogleReviews(id);
        if (!reviews) return;
        if (reviews.length > 10) reviews = reviews.slice(0, 10);
        await dispatch(setReviews(reviews));
        navigation.navigate("Reviews")
    }

    const renderItem = ({ item }: { item: RestaurantCard }) => {
        return (
            <Card
                key={item.place_id}
                photo_url={item.photo_url}
                icon={item.icon}
                name={item.name}
                rating={item.rating}
                user_ratings_total={item.user_ratings_total}
                vicinity={item.vicinity}
                place_id={item.place_id}
                action={() => goToReviews(item.place_id)}
            />
        )
    }

    return (
        <View>
            {restaurantList.length > 0 && <FlatList
                data={restaurantList}
                renderItem={renderItem}
                keyExtractor={(item: RestaurantCard) => item.name}
            />}

        </View>
    )
}

export default CardList
