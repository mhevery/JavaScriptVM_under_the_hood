export enum Instruction {
  HALT = 0, // Stop program execution
  GO_SUB = 1, // Call subroutine (relative)
  RETURN = 2, // Return from subroutine
  JUMP = 10, // Jump
  JUMP_IF_LT_OR_EQ = 11, // Jump if LT or EQ flag set
  LOAD_CONST_R0 = 100, // Load value into R0
  LOAD_CONST_R1 = 101, // Load value into R0
  LOAD_CONST_A0 = 200, // Load address into A0,
  LOAD_CONST_AE0 = 201, // Load address into AE0,
  LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R0 = 300, // Load data from address A0 + AE0 into R0
  LOAD_VALUE_FROM_ADDR_A0_PLUS_AE0_TO_R1 = 301, // Load data from address A0 + AE0 into R1
  STORE_R0_TO_ADDR_A0_PLUS_AE0 = 350, // Store data from R0 into address A0 + AE0
  COMPARE_R0_TO_CONST = 400, // Compare R0 to constant
  ADD_R1_TO_R0 = 401, // Add R0 to R1 store in R0
  PUSH_R0 = 500, // Push R0 onto stack
  PUSH_R1 = 501, // Pop R0 from stack
  POP_R0 = 502, // Push R0 onto stack
  POP_R1 = 503, // Pop R0 from stack
  INCREMENT_R0 = 600, // Increment R0
  DECREMENT_R0 = 601, // Decrement R0
  MOVE_R0_TO_R1 = 700, // Move R0 to R1
  MOVE_R1_TO_R0 = 701, // Move R1 to R0
}

export enum Flags {
  EQUAL = 1 << 0,
  GRATER_THAN = 1 << 1,
  LESS_THAN = 1 << 2,
}
