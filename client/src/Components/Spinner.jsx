import React from 'react';
import { CircleLoader } from 'react-spinners';

const MyLoader = () => {
  return (
    <div className="loader-container">
      <div style={{marginBottom: '50%'}}></div>
      <CircleLoader color="#4CAF50" loading={true} size={100} />
    </div>
  );
}

export default MyLoader;


/* react ronders
 BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader, SyncLoader)
*/