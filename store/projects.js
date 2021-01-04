import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project, user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/projects", { project, user });
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// export const getProjects = createAsyncThunk(
//   "user/getUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/api/projects");
//       return response.data[0];
//     } catch (error) {
//       return rejectWithValue({ error: error.message });
//     }
//   }
// );

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [
      {
        title: "Auto-Hue",
        image: "/static/user_profile/assets/auto-hue.png",
        url: "https://github.com/bgreenb11/2019fall_scarlet-witch",
        example: "",
        user: "ben",
        components: ["Vue", "Vuex", "Electron"],
        description: `This impressive paella is a perfect party dish and a fun meal to
        cook together with your guests. Add 1 cup of frozen peas along
        with the mussels, if you like.`,
      },
      {
        title: "Classmate Connect",
        image: "/static/user_profile/assets/github.png",
        url: "https://github.com/bgreenb11/ClassmateConnect",
        example: "",
        user: "ben",
        components: ["Python", "Django"],
        description: ` 1 cup of frozen peas along
        with the mussels, if you like.`,
      },
      {
        title: "dotfiles",
        image: "/static/user_profile/assets/github.png",
        url: "https://github.com/bgreenb11/dotfiles/",
        example: "",
        user: "ben",
        components: ["Vim", "Zsh", "Tmux"],
        description: `This impressive paella is a perfect party dish and a fun meal to
        cook together with your guests. `,
      },
      {
        title: "HPC Usage Data",
        image: "/static/user_profile/assets/github.png",
        url: "",
        example: "https://oit.utk.edu/hpsc/overview/system-usage/",
        user: "ben",
        components: ["Python", "Plotly", "Django"],
        description: `Add 1 cup of frozen peas along
        with the mussels, if you like.`,
      },
    ],
    loading: "idle",
    error: null,
  },
  reducers: {
    addProjectTemp: (state, { payload }) => {
      state.projects.push(payload);
      state.projects.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
    },
    editProject: (state, { payload }) => {
      state.projects[payload.index] = payload.project;
    },
  },
  extraReducers: {
    [addProject.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [addProject.fulfilled]: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.projects = [];
        state.loading = "fulfilled";
      }
    },
    [addProject.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error.message;
      }
    },
  },
});

export const { addProjectTemp, editProject } = projectsSlice.actions;

export default projectsSlice.reducer;
