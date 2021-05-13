## Instructions

After cloning the repository, install the dependencies at the root folder:

`npm i` 

To run any exercise, navigate to the corresponding folder inside src folder and execute:

`node <exerciseName.js> -h`

That will show you the parameters you need to specify in each case.

To run all the tests, execute:

`npm run test`

## Exercise 1

The solution has a linear time and space complexity **O(n)**. We only need to loop n/2 times max and only once if the first comparison is already wrong.

## Exercise 2

The solution has a linear time and space complexity **O(n)**. We use an extra Object to store the Array items and the count for each of them as keys -> values.
We need to loop through the full Array length first and then once for every different value it has, so total 2n in the worst case and n + 1 best case.

## Exercise 3

We have a directory D with a set S of files and a set of terms TT.
Our solution will do the following:


1. Read every file in S (**O(n)**) and split its content in tokens as an Array A (**O(n)**). 
2. For every A, it iterates through all of the tokens in them (**O(n2)**) and saves them as keys for Objects F where the values are also objects having the count and the tf for each token.
3. For every term in TT, it filters the F's containing it at least once (**O(n)**) and then it loops through all the F's (**O(n2)**) to calculate the tfidf for the term and it adds it to the final object of tfidfs (stored as keys -> count) I.
4. Orders I by keys value (**O(n)** + **O(n log(n)))** and saves it in a ranking list R

As this exercise runs as a daemon, it will keep watching for new files added to D. When this happens, they will be added to a list of new files N.

For every period increment P, it will check if we have any N (**O(n))** and, if such, proceed to do the four steps above (steps 1 and 2 apply ONLY for the new files).

The overall complexity for time and space should be **O(n2)** as the most expensive case is having one level nested loops and data structures.

**Note**: By using object keys to store the words in the files at F, we don't need to constantly iterate through lists to check if a term in TT exist in a file, we can try to access that key at **O(1).**
Simirarly, we save the file names as keys at I to increment the tfidf without having to find it in a list.

**Note 2**: When calculating the tf, we could count all token occurrences first and then calculate the tf, but I chose to calculate it everytime so I don't have to loop again once I finish counting.