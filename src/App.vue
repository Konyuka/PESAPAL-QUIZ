<script setup>

// the assebler function
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
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x03 << 12) | (register1 << 8) | (register2 << 4);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "sw"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x04 << 12) | (register1 << 8) | (register2 << 4);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "add"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x05 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "sub"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x06 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "mult"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x07 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "div"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x08 << 12) | (register1 << 8) | (register2 << 4 | register3);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "j"){
      // since we have two items in the instructionItems array we identify what we need by index
      let memoryLocation = instructionItems[1];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x09 << 12) | (memoryLocation & 0xFFF);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "jr"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x0A << 12) | (register1 & 0xFFF);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "beq"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];
      let register2 = instructionItems[2];
      let register3 = instructionItems[3];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x0B << 12) | (register1 << 8) | (register2 << 4) | register3;
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "bne"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[0];
      let register2 = instructionItems[1];
      let register3 = instructionItems[2];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x0C << 12) | (register1 << 8) | (register2 << 4) | register3;
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "inc"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x0A << 12) | (register1 & 0xFFF);
      machineCodes.push(uniqueValue);
    }
    else if (operationCode === "dec"){
      // since we have two items in the instructionItems array we identify what we need by index
      let register1 = instructionItems[1];

      // shift 0x02 left by 12bits, register left by 8bits then combine the result of value AND 0xFF
      let uniqueValue = (0x0A << 12) | (register1 & 0xFFF);
      machineCodes.push(uniqueValue);
    }
  }





}
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
