import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getLocalHabits } from "../components/habitsList";

console.log(getLocalHabits());
export interface habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface habitState {
  habits: habit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: habitState = {
  habits: getLocalHabits(),
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabits: habit[] = getLocalHabits();
  // [
  //   {
  //     id: "1",
  //     name: "Read",
  //     frequency: "daily",
  //     completedDates: [],
  //     createdAt: new Date().toISOString(),
  //   },
  //   {
  //     id: "2",
  //     name: "Exercise",
  //     frequency: "daily",
  //     completedDates: [],
  //     createdAt: new Date().toISOString(),
  //   },
  // ];
  return mockHabits;
});

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const isDuplicate = state.habits.some(
        (h) => h.name === action.payload.name
      );
      if (isDuplicate) {
        alert("habit already added");
      }
      if (!isDuplicate) {
        const newHabit: habit = {
          id: nanoid(),
          name: action.payload.name,
          frequency: action.payload.frequency,
          completedDates: [],
          createdAt: new Date().toISOString(),
        };
        state.habits.push(newHabit);
      }
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action: PayloadAction<{ id: string }>) => {
      const hab = state.habits.filter((h) => h.id !== action.payload.id);

      state.habits = hab;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      });
  },
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
