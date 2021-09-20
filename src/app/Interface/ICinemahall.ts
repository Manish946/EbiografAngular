import { ICinemaSeats } from "./ICinemaSeats";
import { IShow } from "./IShow";

export interface ICinemahall
{
  cinemaHallID:number;
  name:string,
  cinemaSeats:ICinemaSeats,
  show:IShow,
  cinemaID:number,


}
