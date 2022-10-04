import FormControl from 'common/components/FormControl/FormControl';
import UseWindowSize from 'common/hooks/UseWindowsSize';
import { IFormUtils, FormValues } from 'common/interface';
import { useEffect } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import './ListOfProducts.scss'


interface IListOfProducts extends IFormUtils {
  control: Control<FormValues, any>
}


const ListOfProducts = ({ control, register, errors }: IListOfProducts) => {
  const [, screenWidth] = UseWindowSize();

  useEffect(() => addProduct(), [])



  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "products", // The name of the array
  });


  const addProduct = () => {
    prepend({
      itemName: "",
      color: "",
      amount: "",
      size: "",
      kind: ""
    })
  }

  const removeProduct = (index: number) => remove(index)

  return (
    <></>
  )
}

export default ListOfProducts