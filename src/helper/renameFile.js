export function renameFile ( fileName, id )
{
  const regex = /\.(png|jpe?g)$/i;
  const Id = id;


  if ( regex.test( fileName ) )
  {
    fileName.split( regex );
    return `${ Id }${ regex.exec( fileName )[ 0 ] }`;
  }

  return false;
}
