import Person from "./Person";
import { useEffect, useState } from "react";

const getPerson = async () => {
  const response = await fetch("https://www.randomuser.me/api?results=1");
  const data = await response.json();

  return data;
};

function PersonController() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getPerson();
      console.log(data);

      //extract the required data
      const personObj = {
        firstName: data.results[0].name.first,
        lastName: data.results[0].name.last,
        email: data.results[0].email,
      };

      setPerson(personObj);
    })();
  }, []);

  return (
    <>
      <Person person={person}></Person>
    </>
  );
}

export default PersonController;
