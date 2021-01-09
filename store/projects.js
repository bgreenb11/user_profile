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
        attributes: "Vue,Vuex,Electron",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Officiis sequi, perspiciatis ex quidem soluta alias ducimus. 
        Delectus laudantium id ad deleniti! Voluptatum aut incidunt, 
        ducimus omnis amet neque, accusamus rerum, atque repudiandae eos voluptatem! 
        Quia, sit laboriosam culpa dolorem sunt placeat odit.`,
      },
      {
        title: "Classmate Connect",
        image: "/static/user_profile/assets/github.png",
        url: "https://github.com/bgreenb11/ClassmateConnect",
        example: "",
        user: "ben",
        attributes: "Python,Django",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, dolorem?`,
      },
      {
        title: "dotfiles",
        image: "/static/user_profile/assets/github.png",
        url: "https://github.com/bgreenb11/dotfiles/",
        example: "",
        user: "ben",
        attributes: "Vim,Zsh,Tmux",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Modi sunt esse deleniti atque pariatur, fugit voluptatem reiciendis dolorem labore deserunt!`,
      },
      {
        title: "HPC Usage Data",
        image: "/static/user_profile/assets/github.png",
        url: "",
        example: "https://oit.utk.edu/hpsc/overview/system-usage/",
        user: "ben",
        attributes: "Python,Plotly,Django",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Labore illum excepturi quam unde iste quis!`,
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
    deleteProject: (state, { payload }) => {
      state.projects = state.projects.filter((p) => p.title !== payload.title);
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

export const {
  addProjectTemp,
  editProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
