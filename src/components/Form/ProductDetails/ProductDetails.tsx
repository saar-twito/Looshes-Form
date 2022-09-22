import FormControl from 'common/components/FormControl/FormControl';
import UseWindowSize from 'common/hooks/UseWindowsSize';
import React, { useEffect } from 'react'
import { Control, useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FormValues } from 'screens/HomePage/interfaces';


interface IProductDetails {
  register: any;
  errors: any
  control: Control<FormValues, any> | undefined
}


const ProductDetails = ({ control, register, errors }: IProductDetails) => {
  const [, screenWidth] = UseWindowSize();
  useEffect(() => addProduct(), [])


  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "product", // The name of the array
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
    <div>
      {screenWidth < 500 ? <>
        <h3>תיאור הבקשה</h3>
        <div className="product-container product-table white-container">

          {fields.map((field, index) => (
            <div key={field.id}>
              {/* SMALL SCREENS */}
              <div className="products-list-for-small-screens">

                {/* product.itemName */}
                <FormControl
                  htmlFor={`product.${index}.itemName`}
                  label="מוצר"
                  register={register}
                  registerName={`product.${index}.itemName` as const}
                  errorMessage={errors?.product && errors?.product[index]?.itemName?.message} />


                {/* product.itemName */}
                <FormControl
                  htmlFor={`product.${index}.color`}
                  label="צבע"
                  register={register}
                  registerName={`product.${index}.color` as const}
                  errorMessage={errors?.product && errors?.product[index]?.color?.message} />

                {/* product.size */}
                <FormControl
                  htmlFor={`product.${index}.size`}
                  label="מידה"
                  register={register}
                  registerName={`product.${index}.size` as const}
                  errorMessage={errors?.product && errors?.product[index]?.size?.message} />


                <div className="form-control">
                  <label htmlFor={`product.${index}.kind`}>סוג</label>
                  <select id={`product.${index}.kind`} {...register(`product.${index}.kind` as const)}>
                    <option value="קרטונים">קרטונים</option>
                    <option value="גלילים">גלילים</option>
                  </select>
                </div>

                <div className="form-control">
                  <label htmlFor={`product.${index}.amount`}>כמות</label>
                  <input type="number" min="0" max="100" id={`product.${index}.amount`} {...register(`product.${index}.amount` as const)} />
                </div>

                <td className="remove-trash-td"><RiDeleteBinLine onClick={() => removeProduct(index)} className='remove-trash-icon' /></td>
              </div>
            </div>
          ))}
          <button type="button" className="add-product" onClick={() => addProduct()}>הוסף מוצר</button>
        </div>

      </> : <>
        <h3>תיאור הבקשה</h3>
        <div className="white-container">
          <table>
            <thead>
              <tr>
                <th>כמות</th>
                <th>סוג</th>
                <th>מידה</th>
                <th>צבע</th>
                <th>מוצר</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td>
                    <label htmlFor={`product.${index}.amount`}></label>
                    <input id={`product.${index}.amount`} type="number" min="0" max="100" {...register(`product.${index}.amount` as const)} />
                    <p className="error">{errors?.product && errors?.product[index]?.amount?.message}</p>
                  </td>
                  <td>
                    <select id={`product.${index}.kind`} {...register(`product.${index}.kind` as const)}>
                      <option value="קרטונים">קרטונים</option>
                      <option value="גלילים">גלילים</option>
                    </select>
                  </td>
                  <td>
                    <label htmlFor={`product.${index}.size`}></label>
                    <textarea id={`product.${index}.size`} {...register(`product.${index}.size` as const)} />
                  </td>
                  <td>
                    <label htmlFor={`product.${index}.color`}></label>
                    <textarea id={`product.${index}.color`} {...register(`product.${index}.color` as const)} />
                  </td>

                  <td>
                    <label htmlFor={`product.${index}.itemName`}></label>
                    <textarea id={`product.${index}.itemName`} {...register(`product.${index}.itemName` as const)} />
                  </td>

                  <td className="remove-trash-td"><RiDeleteBinLine onClick={() => removeProduct(index)} className='remove-trash-icon' /></td>
                </tr>
              ))}
            </tbody>

          </table>
          <button type="button" className="add-product" onClick={() => addProduct()}>הוסף מוצר</button>
        </div>
      </>}
    </div>
  )
}

export default ProductDetails