import { Button, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const HT = () => {
    const [list, setlist] = useState([]);
    useEffect(()=>{
        getlist()
    },[])
const getlist =async()=>{
    await fetch("http://192.168.86.104:3000/ht")
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setlist(data)
    }).catch(err =>{
        console.log(err);
    })
}
const renderItem = ({ item }) => {
    return (
        <View>
            <Text>Name:{item.tenSach}</Text>
            <Text>Gmail:{item.Email}</Text>
            <Button title='DELETE' onPress={() => {
                id = item.id
                deleteItem(id)
            }}></Button>


        </View>
    )
}
  return (
    <View>
        <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.id}></FlatList>
    </View>
  )
}

export default HT

const styles = StyleSheet.create({})