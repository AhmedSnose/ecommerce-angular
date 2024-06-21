import { PageServerLoad } from "@analogjs/router";
import { SELLERS } from "../../../DATA";
// import { SELLERS } from "../../components/shared/Models/sellerType";

export const load = async ({
    params, // params/queryParams from the request
    req, // H3 Request
    res, // H3 Response handler
    fetch, // internal fetch for direct API calls,
    event, // full request event
  }: PageServerLoad) => {
    let slug = params ? params['slug'] : '';
    console.log(slug , 'slug');
    
    
    return {
      seller: SELLERS.filter(s=>s.slug === slug)[0],
    };
  };