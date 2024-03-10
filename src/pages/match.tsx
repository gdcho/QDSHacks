import { cardClasses } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

function run(thisUser, users){
    
    type MatchResult = {
        combinedDifference: number;
        indices: [number, number];
        personIndex: number;
      };
      
      function findTop5BestMatches(matches: MatchResult[], userIdMap: { [index: number]: string }): void {
        matches.sort((a, b) => b.combinedDifference - a.combinedDifference); // Assuming you want the smallest differences
        const numMatchesToPrint = Math.min(5, matches.length);
        for (let i = 0; i < numMatchesToPrint; i++) {
          const match = matches[i];
          // Use the map to get the user_id from the personIndex
          const userId = userIdMap[match.personIndex];
          console.log(`Top ${i + 1} Match -> Combined Difference: ${match.combinedDifference}, Indices: ${match.indices[0]}, ${match.indices[1]} for person with id ${userId}`);
        }
      }
      
      function iterator(chosen, person) {
        let maxPosDifference = Number.MIN_SAFE_INTEGER;
        let maxNegDifference = Number.MAX_SAFE_INTEGER;

        let index1 = -1;
        let index2 = -1;


        // Ensure we're working with numbers by mapping the strings to integers
        const chosenRatings = chosen[0].map(rating => parseInt(rating, 10));
        const personRatings = person.map(rating => parseInt(rating, 10));

        for (let i = 0; i < personRatings.length; i++) {
          // Calculate the difference between the chosen user's ratings and another user's ratings

          var diff = chosenRatings[i] - personRatings[i];


          if (diff > maxPosDifference) {
            maxPosDifference = diff;
            index1 = i;
          }
          // Check for a negative difference and store it if it's more negative than the current maxNegDifference
          if (diff < maxNegDifference) {
            maxNegDifference = diff;
            index2 = i;
          }

        }
      
        // Return an object with the combined differences and the indices of the largest positive and negative differences
        return {
          combinedDifference: maxPosDifference + Math.abs(maxNegDifference),
          indices: [index1, index2],
          personIndex: -1, // This should be set to the actual index of the person in the calling function
        };
      }
      
      function main(thisUser, users) {

        const chosen = thisUser;
        const people = users;
        
        const matches: MatchResult[] = [];
        const userIdMap = users.reduce((map, user, index) => {
          map[index] = user.userId;
          return map;
        }, {});
        people.forEach((person, index) => {
          console.log(person);
          const result = iterator(chosen, people[index].userResults);
          result.personIndex = index; 
          matches.push(result);
        });
      
        findTop5BestMatches(matches, userIdMap);
      }
      
      main(thisUser, users);      
}

export default function Match() {
  const router = useRouter();
  const { data: session } = useSession();
  const [thisUser, setThisUser] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (session) {
      setThisUser(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (!thisUser) return;

    try {
      const response = await fetch('/api/mongo');
      const jsonData = await response.json();
      console.log('Data received:', jsonData);

      // Assuming `thisUser` matches a unique user.id in jsonData,
      // and that userResults is structured correctly for your application's needs.
      const thisUserData = jsonData.find(user => user.user_id === thisUser);
      if (!thisUserData) {
        console.error('This user data not found');
        return;
      }
      
      var otherUsers = jsonData.filter(user => 
        user.user_id !== thisUser && user.term === thisUserData.term && user.option === thisUserData.option
      );
      const thisUserResults = thisUserData.courses.map(course => course.rating);
      const otherUsersResults = otherUsers.map(user => ({
        userId: user.user_id,
        userResults: user.courses.map(course => course.rating),

      }));

      run([thisUserResults], otherUsersResults); 
    } catch (error) {
      console.error('Error:', error);
    }
    };

    fetchData();
  }, [thisUser]);

}
