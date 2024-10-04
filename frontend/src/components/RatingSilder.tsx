import  Slider  from "@mui/material/Slider"
import { styled } from '@mui/material/styles';

const PrettoSlider = styled(Slider)({
    color: '#FA6D0F',
    height: 15,
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      }
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 16,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#FA6D0F',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
    '&.Mui-disabled': {
        color: '#E77E36', // Bright Yellow color
        '& .MuiSlider-thumb': {
            backgroundColor: '#E77E36',
        },
        '& .MuiSlider-valueLabel': {
            backgroundColor: '#e01f76',
        }
    },
  });

const RatingSlider : React.FunctionComponent<{rating : number,min?: number,max?:number, onChange : (e:any)=>void, immovable? : boolean,id?:string}> = ({rating,onChange,immovable = false,min=1,max=10,id}) => {

  
    return(
        <PrettoSlider
        min = {min}
        max = {max}
        step={1}
        valueLabelDisplay="auto"
        value={rating}
        id={id}
        onChange={onChange}
        disabled = {immovable}
        />
    )

}

export default RatingSlider