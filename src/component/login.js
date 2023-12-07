import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginuser } from '../redux/dataSlice';

const login = ({ navigation, route }) => {

    const [arrUser, setarrUser] = useState([]);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const dispatch = useDispatch();


    const handlegetAlluser = async () => {
        try {
            let res = await fetch("https://6571ea6cd61ba6fcc013f3b0.mockapi.io/api/v1/user", {
                method: "GET"
            })
            if (!res) {
                throw new Error("get data error")
            } else {
                let data = await res.json();
                setarrUser(data);
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    const handleLogin = () => {
        if (arrUser && arrUser.length > 0) {
            let index = arrUser.findIndex(item => item.username === username && item.password === password)
            if (index !== -1) {
                dispatch(loginuser(arrUser[index]))
                navigation.navigate("home")
            }
            else {
                alert("login error")
            }
        }
    }

    useEffect(() => {
        handlegetAlluser();
    }, [])


    return (
        <View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Login</Text>
            </View>
            <View style={{ marginTop: 10, alignItems: "center" }}>
                <TextInput placeholder='user'
                    style={{ width: 350, height: 40, borderWidth: 1, borderRadius: 5, outline: "none" }}
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <TextInput placeholder='password'
                    style={{
                        width: 350, height: 40, borderWidth: 1, borderRadius: 5,
                        outline: "none", marginTop: 10
                    }}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                <Pressable style={{
                    height: 35, width: 80, justifyContent: "center", alignItems: "center",
                    borderRadius: 5, backgroundColor: "blue", marginRight: 20
                }}
                    onPress={() => handleLogin()}
                >
                    <Text style={{ fontSize: 15, color: "white" }}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default login;