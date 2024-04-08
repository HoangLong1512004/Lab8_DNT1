import { Button, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Sach = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [tenSach, settenSach] = useState('');
    const [img, setimg] = useState('');
    const [CTmodalVisible, setCTModalVisible] = useState(false);

    const [Email, setEmail] = useState();
    const [list, setlist] = useState([]);
const [visibleUpdate, setvisibleUpdate] = useState(false);
    const getlist = async () => {
        await fetch("http://192.168.86.104:3000/ht")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setlist(data)
            }).catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getlist()
    }, [])
    //xoá
    const deleteItem = (id) => {
        fetch("http://192.168.86.104:3000/ht/" + id, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                console.log("xoá thành công");
                getlist()
            } else {
                console.log("xoá thất bại");
            }
        }).catch(err => console.log(err))
    }

    //thêm
    const Add = () => {
        const newData = {
            tenSach: tenSach,
            img: img,
            Email: Email
        }
        fetch("http://192.168.86.104:3000/ht", {
            method: "POST",
            body: JSON.stringify(newData),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.ok) {
                console.log("thêm thành công");
                getlist()
            } else {
                console.log("thêm thất bại");
            }
        }).catch(er => console.log(er))
    }
    //sửa
    const editItem = (id) => {
        const updateData = {
            Name: tenSach,
            img: img,
            Email:Email
        }
        fetch('http://192.168.86.104:3000/ht/' + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
        }).then(res => {
            if (res.ok) {
                getlist()
                console.log("Sửa thành công");
            } else {
                console.log("Sửa thất bai");
            }
        }).catch(er => console.log(er))

    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <ScrollView>
                <TouchableOpacity onPress={() => {
                            setCTModalVisible(true)
                            settenSach(item.tenSach)
                        }}>                    <Text>Name:{item.tenSach}</Text>
                        </TouchableOpacity>
                    <Text>Name:{item.tenSach}</Text>
                    <Text>Email:{item.Email}</Text>
                    <View>
                        <Image style={{ height: 100, width: 200 }} source={{ uri: item.img }} />
                    </View>
                    <Button title='DELETE' onPress={() => {
                        id = item.id
                        deleteItem(id)
                    }}></Button>
                    <Button title='sửa' onPress={() => {
                        id = item.id
                        settenSach(item.hoten)
                        setimg(item.img)
                        setEmail(item.Email)
                        setvisibleUpdate(true)
                    }} />

                </ScrollView>

            </View>
        )
    }









    return (
        <View>
            <ScrollView>
                <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.id}></FlatList>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput placeholder='Name' onChangeText={(text) => { settenSach(text) }} />
                                <TextInput placeholder='img' onChangeText={(Image) => { setimg(Image) }} />
                                <TextInput placeholder='Email' onChangeText={(text) => { setEmail(text) }} />

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        Add()
                                    }}>
                                    <Text style={styles.textStyle}>Thêml</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>Thêm</Text>
                    </Pressable>
                </View>
                <Modal visible={visibleUpdate}>
                    <TextInput placeholder='name' value={tenSach} onChangeText={(text) => { settenSach(text) }} />
                    <TextInput placeholder='img' value={img} onChangeText={(text) => { setimg(text) }} />
                    <TextInput placeholder='Email' value={Email} onChangeText={(text) => { setEmail(text) }} />
                    <Button title='Lưu' onPress={() => {
                        setvisibleUpdate(false)
                        editItem(id)
                    }} />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={CTmodalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText} value={img}>image : {img}</Text>
                            <Text style={styles.modalText} value={tenSach}>Họ tên : {tenSach}</Text>
                            <Text style={styles.modalText} value={Email}>Email : {Email}</Text>
                            <View style={{ flexDirection: 'row', gap: 20 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setCTModalVisible(!CTmodalVisible)}>
                                    <Text style={styles.textStyle}>ok</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )

}
export default Sach

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
})