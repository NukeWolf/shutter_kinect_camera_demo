import React, { useRef, useEffect } from "react";

const PIXELS_TO_INCH = 3;
const SHUTTER_Y_PX = 60;
const SHUTTER_X_PX = 400;
const WIDTH_OF_SHUTTER_INCHES = 26;
const DEPTH_OF_SHUTTER_INCHES = 20;

//const MAX_DISTANCE_FROM_CENTER_INCHES = 10;

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const { cameraRotation, distance, cameraFOV, cameraDepth, originalCamera } =
    props;

  const CAMERA_THETA_FROM_CENTER_RAD =
    (parseInt(cameraRotation) * Math.PI) / 180;
  const DISTANCE_FROM_CENTER_INCHES = parseInt(distance);
  const CAMERA_FOV_RAD = (parseInt(cameraFOV) * Math.PI) / 180;

  const CAMERA_DEPTH_INCHES = cameraDepth;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const draw = (ctx) => {
      // Shutter Backboard
      ctx.lineWidth = 5;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "rgba(0,0,0)";

      ctx.beginPath();
      ctx.rect(
        SHUTTER_X_PX,
        SHUTTER_Y_PX,
        WIDTH_OF_SHUTTER_INCHES * PIXELS_TO_INCH,
        DEPTH_OF_SHUTTER_INCHES * PIXELS_TO_INCH
      );
      ctx.closePath();
      ctx.stroke();

      //Cameras points
      const CENTER_X =
        SHUTTER_X_PX + (WIDTH_OF_SHUTTER_INCHES * PIXELS_TO_INCH) / 2;

      const LEFT_CAM_POINT = [
        CENTER_X - DISTANCE_FROM_CENTER_INCHES * PIXELS_TO_INCH,
        SHUTTER_Y_PX,
      ];
      const RIGHT_CAM_POINT = [
        CENTER_X + DISTANCE_FROM_CENTER_INCHES * PIXELS_TO_INCH,
        SHUTTER_Y_PX,
      ];

      //CAMERA FOV's

      //LEFT CAMERA
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(LEFT_CAM_POINT[0], LEFT_CAM_POINT[1]);
      ctx.arc(
        LEFT_CAM_POINT[0],
        LEFT_CAM_POINT[1],
        CAMERA_DEPTH_INCHES * PIXELS_TO_INCH,
        0.5 * Math.PI - CAMERA_FOV_RAD / 2 + CAMERA_THETA_FROM_CENTER_RAD,
        0.5 * Math.PI + CAMERA_FOV_RAD / 2 + CAMERA_THETA_FROM_CENTER_RAD
      );

      ctx.fillStyle = "rgba(10,200,30,0.4)";
      ctx.lineTo(LEFT_CAM_POINT[0], LEFT_CAM_POINT[1]);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      //Right
      ctx.beginPath();
      ctx.moveTo(RIGHT_CAM_POINT[0], RIGHT_CAM_POINT[1]);

      ctx.arc(
        RIGHT_CAM_POINT[0],
        RIGHT_CAM_POINT[1],
        CAMERA_DEPTH_INCHES * PIXELS_TO_INCH,
        0.5 * Math.PI - CAMERA_FOV_RAD / 2 - CAMERA_THETA_FROM_CENTER_RAD,
        0.5 * Math.PI + CAMERA_FOV_RAD / 2 - CAMERA_THETA_FROM_CENTER_RAD
      );
      ctx.lineTo(RIGHT_CAM_POINT[0], RIGHT_CAM_POINT[1]);
      ctx.fillStyle = "rgba(10,200,30,0.4)";
      ctx.fill();
      ctx.fillStyle = "#000000";
      ctx.stroke();
      ctx.closePath();

      //Draw Cameras
      ctx.fillStyle = "rgba(233,20,10)";
      ctx.fillRect(LEFT_CAM_POINT[0] - 5, LEFT_CAM_POINT[1] - 5, 10, 10);
      ctx.fillRect(RIGHT_CAM_POINT[0] - 5, RIGHT_CAM_POINT[1] - 5, 10, 10);

      //Original Cameras
      if (originalCamera) {
        ctx.beginPath();
        ctx.moveTo(CENTER_X, SHUTTER_Y_PX);
        ctx.arc(
          CENTER_X,
          SHUTTER_Y_PX,
          CAMERA_DEPTH_INCHES * PIXELS_TO_INCH,
          0.5 * Math.PI - CAMERA_FOV_RAD / 2,
          0.5 * Math.PI + CAMERA_FOV_RAD / 2
        );
        ctx.lineTo(CENTER_X, SHUTTER_Y_PX);
        ctx.fillStyle = "rgba(200,10,30,0.6)";
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.stroke();
      }
    };

    draw(context);
  }, [
    DISTANCE_FROM_CENTER_INCHES,
    CAMERA_THETA_FROM_CENTER_RAD,
    CAMERA_FOV_RAD,
    CAMERA_DEPTH_INCHES,
    originalCamera,
  ]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
