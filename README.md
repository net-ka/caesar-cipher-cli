## caesar-cipher-cli

Instructions for project check:
1. To clone this repository write in terminal `git clone https://github.com/net-ka/cli-caesar-cipher.git`
2. Open the folder with code using command `cd cli-caesar-cipher/task`
3. You can launch the program using command `node app.js`
4. Program has several options:
  * -s, --shift: a shift (required)
  * -i, --input: an input file
  * -o, --output: an output file
  * -a, --action: an action encode/decode (required)
5. Files for input and output text are 'input.txt' and 'output.txt'
6. Several command examples for usage:
  * `node app.js -a encode -s 2`
  * `node app.js -a decode -s 2 -o './output.txt'`
  * `node app.js -a encode -s 2 -i './input.txt'`
  * `node app.js -a decode -s 2 -i './input.txt' -o './output.txt'`
7. To stop the program manually make cursor active in your terminal and press 'ctrl + c'
8. Program encodes/decodes only latin letters, other characters remain the same