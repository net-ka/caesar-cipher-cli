## caesar-cipher-cli

Instructions for project check:
1. To clone this repository write in terminal `git clone https://github.com/net-ka/cli-caesar-cipher.git`
2. Open the repository folder using the command `cd cli-caesar-cipher`
3. Install dependencies with the command `npm install`
4. Open the folder with JS task files using the command `cd task`
5. You can launch the program using the command `node app.js` but you need the options for properly work (see point no.6)
6. Program has several options:
  * -s, --shift: a shift (required)
  * -i, --input: an input file
  * -o, --output: an output file
  * -a, --action: an action encode/decode (required)
7. Files for input and output text are 'input.txt' and 'output.txt' respectively
8. Several command examples for usage (it's necessary to be inside the folder 'task' in terminal to use them):
  * `node app.js -a encode -s 2`
  * `node app.js -a decode -s 2 -o './output.txt'`
  * `node app.js -a encode -s 2 -i './input.txt'`
  * `node app.js -a decode -s 2 -i './input.txt' -o './output.txt'`
9. To stop the program manually make cursor active in your terminal and press 'ctrl + c'
10. Program encodes/decodes only latin letters, other characters remain the same