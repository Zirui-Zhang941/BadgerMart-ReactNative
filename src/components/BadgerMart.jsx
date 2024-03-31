import React, { } from "react";
import { Button, Text, View } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'
import { useEffect, useState } from "react";

export default function BadgerMart(props) {
    const [item,setItem]=useState([]);
    const [currentitem,setCurrentItem]=useState(0);
    const [basket,setBasket]=useState({});
    const [totalItems, setTotalItems]=useState(0);
    const [totalCost,setTotalCost]=useState(0);

    useEffect(()=>{
        fetch('https://cs571.org/api/s24/hw7/items',{
            headers:{
                "X-CS571-ID": 'bid_f797898160368bd8134003297afb0e1e9caa655bdd7e50fd71dda9b6872f0f4a'
            }
        }).then(res=>res.json()).then(json=>{
            setItem(json)
            const initialBasket = {};
            json.forEach(item => {
                initialBasket[item.name] = 0;
            });
            setBasket(initialBasket); 
        })
    },[]);
    //console.log(item);
    //set total items
    useEffect(()=>{
        setTotalItems(0);
        Object.keys(basket).forEach((key)=>{
            
            setTotalItems((prev)=>prev+basket[key]);
        });
    },[basket]);
    //set total cost
    useEffect(()=>{
        setTotalCost(0);
        Object.keys(basket).forEach((key)=>{
            const Itemprice=item.filter(item=>item.name==key);
            const itemCost=(basket[key]*Itemprice[0].price);
            
            //setTotalCost((prev)=>prev+(basket[key]*Itemprice[0].price));
            setTotalCost((prev)=>prev+itemCost);
        });
    },[basket]);

    const handlePrevious=()=>{
        setCurrentItem((prev)=>prev-1);
    }

    const handleNext=()=>{
        setCurrentItem((prev)=>prev+1);
    }

    const handleAddToBasket=(itemName)=>{
        if (basket[itemName]<item[currentitem].upperLimit){
            setBasket(prevBasket=>({
                ...prevBasket,
                [itemName]:prevBasket[itemName]+1
            }));
        }
    };

    const handleRemoveFromBasket=(itemName)=>{
        if (basket[itemName]>0){
            setBasket(prevBasket=>({
                ...prevBasket,
                [itemName]:prevBasket[itemName]-1
            }));
        }
    };

    const handlePlaceOrder=()=>{
        alert(`Order Confirmed! Your order contains ${totalItems.toFixed(2)} items and costs ${totalCost.toFixed(2)}!`);
        const resetBasket = {};
            item.forEach(item => {
                resetBasket[item.name]=0;
            });
            setBasket(resetBasket); 
            setCurrentItem(0);
    };
    return <View>
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
        <View>
            <Button
                title="Previous"
                onPress={handlePrevious}
                disabled={currentitem==0}
            />
            <Button
                title="Next"
                onPress={handleNext}
                disabled={currentitem==item.length-1}
            />
        </View>
        {
            item.length > 0 ? (
                
                    <BadgerSaleItem
                        key={item[currentitem].name}
                        name={item[currentitem].name}
                        price={item[currentitem].price}
                        upperLimit={item[currentitem].upperLimit}
                        imgSrc={item[currentitem].imgSrc}
                        basket={basket} 
                        handleAddToBasket={handleAddToBasket} 
                        handleRemoveFromBasket={handleRemoveFromBasket}
                    />
                
            ) : (
                <Text>loading</Text>
            )
        }
        <View>
            <Text>
                You have {totalItems.toFixed(2)} item(s) costing ${totalCost.toFixed(2)} in your cart!
            </Text>
            <Button
                title="Place Order"
                onPress={handlePlaceOrder}
                disabled={totalItems==0}
            />
                
           
        </View>
        
    </View>
}