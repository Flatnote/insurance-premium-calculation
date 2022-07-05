import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CalculatorState {
  value: object;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CalculatorState = {
  value: {},
  status: 'idle'
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateCalculatorValue: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    }
  }
});

export const { updateCalculatorValue } = calculatorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCalculate = (state: RootState) => state.calculator.value;

export default calculatorSlice.reducer;
