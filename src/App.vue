<script setup>

// Start of Problem 0
const assembler = (textProgram) => {
  // later to be used to store computed codes 
  let machineCodes = []  

  // extract the instructonis from the string
  let instructionsArray = textProgram.split("\n");

  // loop through every item in the instructionsArray
  for (let index = 0; index < instructionsArray.length; index++) {

    let instruction = instructionsArray[index];
    // remove spaces and make an array of items
    let instructionItems = instruction.split(" ");
    // get first item 
    let operationCode = instructionItems[0]

    // If statements
    if (operationCode === "halt"){
      machineCodes.push(0x00);
    }
    else if (operationCode === "nop"){
      machineCodes.push(0x00);
    }
    else if (operationCode === "li"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register = instructionItems[1];
      let value = instructionItems[2];
      // shift 0x02 left by 12bits, register left by 8bits then keep the value in the range of 8 bit
      let uniqueValue = (0x02 << 12) | (register << 8) | (value & 0xFF);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "lw"){
      // since we have items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];

      let uniqueValue = (0x03 << 12) | (register1 << 8) | (register2 << 4);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "sw"){
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];

      let uniqueValue = (0x04 << 12) | (register1 << 8) | (register2 << 4);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "add"){
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      let uniqueValue = (0x05 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "sub"){
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      let uniqueValue = (0x06 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "mult"){
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      let uniqueValue = (0x07 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "div"){
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      let uniqueValue = (0x08 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "j"){
      let memoryLocation = instructionItems[1];

      let uniqueValue = (0x09 << 12) | (memoryLocation & 0xFFF);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "jr"){
      let register1 = instructionItems[1];

      let uniqueValue = (0x0A << 12) | (register1 & 0xFFF);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "beq"){
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      let uniqueValue = (0x0B << 12) | (register1 << 8) | (register2 << 4) | register3;
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "bne"){
      let register1 = instructionItems[0];
      let register2 = instructionItems[1];
      let register3 = instructionItems[2];

      let uniqueValue = (0x0C << 12) | (register1 << 8) | (register2 << 4) | register3;
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "inc"){
      let register1 = instructionItems[1];

      let uniqueValue = (0x0A << 12) | (register1 & 0xFFF);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "dec"){
      let register1 = instructionItems[1];

      let uniqueValue = (0x0A << 12) | (register1 & 0xFFF);
      machineCodes.push(uniqueValue);
    }
  }


  // pass result to the simulator
  simulator(machineCode)

}

const simulator = (machineCode) => {

  // up to 65536 16-bit integers in memory
  var memory = new Uint16Array(0x0000FFFF + 1);
  var registers = new Uint32Array(5);

  var PC = 0x0000CFFF;


  // parse code into machine code
  const machineCode = parseCode(machineCode);


  while (true) {
    const instruction = machineCode[PC];
    PC++;  // increment PC after fetching instruction

    switch (instruction.opcode) {
      case 0x00: // halt
        console.log("Program terminated.");
        return;
      case 0x01: // nop
        // do nothing
        break;
      case 0x02: // li
        registers[instruction.reg1] = instruction.immediate;
        break;
      case 0x03: // lw
        registers[instruction.reg1] = memory[registers[instruction.reg2]];
        break;
      case 0x04: // sw
        memory[registers[instruction.reg1]] = registers[instruction.reg2];
        break;
      case 0x05: // add
        registers[instruction.reg3] = registers[instruction.reg1] + registers[instruction.reg2];
        break;
      case 0x06: // sub
        registers[instruction.reg3] = registers[instruction.reg1] - registers[instruction.reg2];
        break;
      case 0x07: // mult
        registers[instruction.reg3] = registers[instruction.reg1] * registers[instruction.reg2];
        break;
      case 0x08: // div
        registers[instruction.reg3] = registers[instruction.reg1] / registers[instruction.reg2];
        break;
      case 0x09: // j
        PC = instruction.immediate;
        break;
      case 0x0A: // jr
        PC = registers[instruction.reg1];
        break;
      case 0x0B: // beq
        if (registers[instruction.reg1] === registers[instruction.reg2]) {
          PC = registers[instruction.reg3];
        }
        break;
      case 0x0C: // bne
        if (registers[instruction.reg1] !== registers[instruction.reg2]) {
          PC = registers[instruction.reg3];
        }
        break;
      case 0x0D: // inc
        registers[instruction.reg1]++;
        break;
      case 0x0E: // dec
        registers[instruction.reg1]--;
        break;
      default:
        console.log("Invalid instruction.");
        return;
    }
    console.log("Registers:", registers);  // log register values after each cycle
  }



}
// End of Problem 0


// Start of Problem 1

// End of problem 1

</script>

<template>
  <header>

    <div>
      PESAPAL ASSIGNMENT
    </div>
  </header>

</template>

<style scoped>
</style>
