import { Button,Text, View ,Image} from "react-native";

export default function BadgerSaleItem(props) {

    return <View>
        <Image 
            style={{
                width:100,
                height:100
            }}
            source={{
                uri:props.imgSrc
            }}
        />
        <Text>Name:{props.name}</Text>
        <Text>Price:{props.price}</Text>
        <Text>You can order up to {props.upperLimit} units</Text>
        <View>
            <Button
                title="-"
                onPress={()=>props.handleRemoveFromBasket(props.name)}
                disabled={props.basket[props.name]==0}
            />
            <Text>{props.basket[props.name]}</Text>
            <Button
                title="+"
                onPress={()=>props.handleAddToBasket(props.name)}
                disabled={props.basket[props.name]==props.upperLimit}
            />
        </View>
    </View>
}
