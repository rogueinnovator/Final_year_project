import multer from "multer";
const storage = multer.diskStorage( {
  destination: function ( request, file, cb )
  {
    console.log( "this is the email from multer", request.email );

    cb( null, "/public/uploads" );
  },
  filename: function ( request, file, cb )
  {
    console.log( "this is the email from multer", request.email );
    cb( null, new Date().toISOString() + "-" + file.originalname );
  },
} );
const fileFilter = ( request, file, cb ) =>
{
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  )
  {
    cb( null, true );
  } else ( { error: "Unsupported file formate " } ), false;
};
const upload = multer( {
  storage,
  limits: { fieldSize: 1024 * 1024 },
  fileFilter,
} );
export default upload;
