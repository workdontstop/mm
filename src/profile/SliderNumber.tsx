import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

function SliderNumberx({
  activeSlide,
  total,
  pey,
  itemCLICKED,
  stopSlider,
  ActiveAutoPlay,
  startSlider
}: any): JSX.Element {



  const startplay=()=>{
if(ActiveAutoPlay[pey]){  startSlider(0) }else{  stopSlider(0)}
  
  }
  ///
  ///
  ///
  /// GET DARKMODE FROM REDUX STORE
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));

  const darkmodeReducer = darkmode;

  return (
    <>
      {itemCLICKED[pey] || total === 1 ? null : (
        <>
          {" "}
          <div  onClick={startplay}
            style={{
              position: "absolute",
              zIndex: 30,
              left: 25,
              cursor:"pointer",
              top: "3vh",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: "bolder",
              opacity:"0.6",
               height:"0px",
               padding:"0px"
               
            }}
          >
            <span
              className={darkmodeReducer ? "turlight" : "turdark"}
              style={{
                padding: "7px",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: darkmodeReducer
                  ? "rgba(51,51,51,0.76)"
                  : "rgba(255,255,255,0.7) ",

                borderRadius: "50%",
                fontSize: "0.92vw",
                color: darkmodeReducer ? "#ffffff" : "#000000",
               
              }}
            >
              {total}
            </span>
          </div>{" "}
        </>
      )}


      {itemCLICKED[pey] ? (
        total === 1 ? null : (
          <>
            {" "}
            <div 
              style={{    cursor:"pointer",
                position: "absolute",
                zIndex: 30,
                right: 21,
                height:"0px",
               
                top: "3vh",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "bolder",
                opacity:"0.8",
                padding:"0px"
              }}
            >
              <span
            
                className={darkmodeReducer ? "turdark" : "turlight"}
                style={{
                  padding: "7px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: darkmodeReducer
                    ? "rgba(51,51,51,0.66)"
                    : "rgba(255,255,255,0.6) ",

                  borderRadius: "50%",
                  fontSize: "0.92vw",
                  color: darkmodeReducer ? "#eeeeee" : "#111111 ",
                }}
              >
                {activeSlide + 1}
              </span>
            </div>{" "}
          </>
        )
      ) : null}
    </>
  );
}

export const SliderNumber = React.memo(SliderNumberx);
