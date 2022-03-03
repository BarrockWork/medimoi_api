// import of the function to test 
const hello = () =>{
    return "hello";
}

// const isPalindrom = () =>{
    
// }

// define the test group 
describe("Sanple test", ()=>{

    // define the test name
    // or 
    // describe the test expect result
    test("it should be 5", () => {
        const result = hello();
        expect(result.length).toEqual(5);
    });
    test("equal to hello", ()=>{
        const result = hello();
        expect(result).toEqual('hello');
    })

    // test("it should be a palindrom", () => {
    //     const result = isPalindrom("")
    // })
});