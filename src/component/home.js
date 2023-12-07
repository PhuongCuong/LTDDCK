import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addlanguage, updateUser } from '../redux/dataSlice';

const home = () => {

    const dispatch = useDispatch();

    const dataredux = useSelector((state) => state.dataAPI)
    const { user } = dataredux;

    const [english, setenglish] = useState("");
    const [vietnamese, setvietnamese] = useState("");

    const handleSave = async () => {

        let data = await dispatch(addlanguage({
            ...user, english: [...user.english, { name: english }],
            vietnamese: [...user.vietnamese, { name: vietnamese }]
        }))
        if (data) {
            dispatch(updateUser({
                ...user, english: [...user.english, { name: english }],
                vietnamese: [...user.vietnamese, { name: vietnamese }]
            }))
        }

    }


    const Childeng = (item) => {
        console.log('check item', item.name)
        return (
            <View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "500" }}>english: {item.item.name}</Text>
                </View>
            </View>
        )
    }

    const Childvn = (item) => {
        console.log('check item', item)

        return (
            <View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "500" }}>vietnamese: {item.item.name}</Text>
                </View>
            </View>
        )
    }



    return (
        <View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>UserName: {user.username}</Text>
            </View>
            <View style={{ marginTop: 10, alignItems: "center" }}>
                <TextInput placeholder='english'
                    style={{ width: 350, height: 40, borderWidth: 1, borderRadius: 5, outline: "none" }}
                    value={english}
                    onChange={(e) => setenglish(e.target.value)}
                />
                <TextInput placeholder='vietnamese'
                    style={{
                        width: 350, height: 40, borderWidth: 1, borderRadius: 5,
                        outline: "none", marginTop: 10
                    }}
                    value={vietnamese}
                    onChange={(e) => setvietnamese(e.target.value)}
                />
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center", marginLeft: 30 }}>
                <FlatList
                    data={user && user?.english.length > 0 ? user?.english : []}
                    renderItem={({ item }) => <Childeng item={item} />}
                />
                <FlatList
                    data={user && user?.vietnamese.length > 0 ? user?.vietnamese : []}
                    renderItem={({ item }) => <Childvn item={item} />}
                />
            </View>
            <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                <Pressable style={{
                    height: 35, width: 80, justifyContent: "center", alignItems: "center",
                    borderRadius: 5, backgroundColor: "blue", marginRight: 20
                }}
                    onPress={() => handleSave()}
                >
                    <Text style={{ fontSize: 15, color: "white" }}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default home;