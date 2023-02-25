/*
  @concatUsernameAndTenant({
    firstName,
    middleName,
    lastName,
    tenantName,
  })

  -> concat firstName, middleName and lastName and tenant name in bracket '()'
  -> trim the result
  -> replace all double spaces with single space

  [input] :-
  {
    firstName: "John",
    middleName: "Tomas",
    lastName: "Duo",
    tenantName: "DemoTenant"
  }
  [result] :- "John Tomas Duo (DemoTenant)
*/

interface IConcatUsernameAndTenant {
  firstName: string;
  middleName: string;
  lastName: string;
  tenantName: string;
}

const concatUsernameAndTenant = (props: IConcatUsernameAndTenant) => {
  const { firstName, middleName, lastName, tenantName, } = props;
  const username = `${firstName} ${middleName ?? ""} ${lastName ?? ""}`.trim().replace("  ", " ");
  return `${username} (${tenantName})`;
}

export default concatUsernameAndTenant;
