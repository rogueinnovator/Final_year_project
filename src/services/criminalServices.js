const baseURL = process.env.BASE_URL;
//1.Save criminal Pics
export async function saveCriminalPic ( formData )
{
  try
  {
    const response = await fetch( `${ baseURL }/criminalData`, {
      method: "POST",
      body: formData
    } );
    if ( !response.ok )
    {
      throw new Error( `HTTP error! status: ${ response.status }` );
    }
    return await response.json();
  } catch ( error )
  {
    handleFetchError( error );
  }

}
//2.compare the facial data 
export async function faceCompare ( formData )
{
  try
  {
    const response = await fetch( `${ baseURL }/compare`, {
      method: "POST",
      body: formData
    } );
    if ( !response.ok )
    {
      throw new Error( `HTTP error! status: ${ response.status }` );

    }
    return await response.json();

  } catch ( error )
  {
    handleFetchError( error );

  }

}
//2. Get a criminal data
export async function CriminalPhoto ( cnic )
{
  try
  {
    const criminalCnic = cnic;
    const response = await fetch( `${ baseURL }/criminalData/${ criminalCnic }`, {
      method: "GET",
    } );
    if ( !response.ok )
    {
      throw new Error( `HTTP error! status: ${ response.status }` );
    }
    const data = await response.json();
    return data;
  } catch ( error )
  {
    handleFetchError( error );
  }
}
// function for Error handling
function handleFetchError ( error )
{
  if ( error.response )
  {
    console.error( "Error status:", error.response.status );
    console.error( "Error message:", error.message );
  } else
  {
    console.error( "Error:", error.message );
  }
  throw error;
}
