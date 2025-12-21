function Person({ person }) {
  if (!person) return null;

  return (
    <div>
      <ul>
        <li>First name: {person.firstName}</li>
        <li>Last name: {person.lastName}</li>
        <li>Email: {person.email}</li>
      </ul>
    </div>
  );
}

export default Person;
