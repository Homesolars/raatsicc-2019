// import axios from "axios";
import gql from "graphql-tag";

export function state() {
  return {
    currentPage: "/",
    isMobileNavVisible: false,
    contactData: null
  };
}

/* MUTATIONS */
export const mutations = {
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },

  SET_CONTACT_DATA(state, data) {
    state.contactData = data;
  },

  SET_MOBILENAV_VISIBILITY(state, visibility) {
    state.isMobileNavVisible = visibility;
  }
};

/* ACTIONS */
export const actions = {
  async nuxtServerInit(store, context) {
    let client = context.app.apolloProvider.defaultClient;

    const res = await client.query({
      query: gql`
        {
          # allPosts(first: 1) {
          #   _firstPublishedAt
          #   slug
          #   tags
          #   title
          #   excerpt
          #   datePublished
          #   body
          #   image {
          #     url
          #   }
          #   author {
          #     name
          #   }
          # }
          allLocations {
            area
            name
            streetAddress
            addressRemaining
            phone
            fax
            email
            onCallContact
          }
        }
      `
    });
    // .then(res => console.log("Apollo RESULT: ", JSON.stringify(res.data)));
    store.commit("SET_CONTACT_DATA", res.data.allLocations);
  }
};
