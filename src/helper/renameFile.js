export function renameFile ( fileName, roll )
{
  const regex = /\.(png|jpe?g)$/i;
  const rollNo = roll;


  if ( regex.test( fileName ) )
  {
    const parts = fileName.split( regex );
    return `${ rollNo }${ regex.exec( fileName )[ 0 ] }`;
  }

  return false;
}
