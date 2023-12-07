import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const updateUser = createAsyncThunk(
    "api/update-user", async (item) => {
        try {
            let res = await fetch(`https://6571ea6cd61ba6fcc013f3b0.mockapi.io/api/v1/user/${item.id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            if (!res) {
                throw new Error("put data error")
            } else {
                let data = await res.json();
                return data;
            }
        } catch (error) {
            throw new Error(error)
        }
    }
)


export const dataSlice = createSlice({
    name: "dataAPI",
    initialState: {
        user: {
            id: "",
            username: "",
            password: "",
            english: [{}],
            vietnamese: [{}],
        }
    },
    reducers: {
        loginuser: (state, action) => {
            state.user = action.payload;
        },
        addlanguage: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
})

export const { loginuser, addlanguage } = dataSlice.actions;

export { updateUser };

export default dataSlice.reducer;