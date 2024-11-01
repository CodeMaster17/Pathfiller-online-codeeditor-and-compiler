// export const BACKEND_ROUTE_CODE = "https://pathfiller.kiitians.com/api/v1";
export const BACKEND_ROUTE_CODE = "http://localhost:5002/api/v1";

// export const PROBLEM_ROUTE = "https://pathfiller.kiitians.com/api/v1/problem";
export const PROBLEM_ROUTE = "http://localhost:5002/api/v1/problem";

export const PLAYGROUND_ROUTE = "http://localhost:5002/api/v1/playground";
//   "https://pathfiller.kiitians.com/api/v1/playground";

export const CodeBlocksCode = `#include <iostream>
using namespace std;

int main() {
    bool codeIsPerfect = true;
    if (codeIsPerfect) {
        cout << "Code is perfect!" << endl;
    } else {
        cout << "There are still semicolons to chase."
        << endl;
    }
    return 0;
}`;