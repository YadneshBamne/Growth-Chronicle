import supabaseClient, { supabaseUrl } from "../utils/supabase.js";

export async function getTopics(token) {
    const supabase = await supabaseClient(token);

 
    const { data, error} = await supabase
      .from("topics")
      .select("*");

      if (error) {
        console.error("Error fetching topics :", deleteError);
        return null;
      }
      return data;
}

export async function addNewTopic(token, _, topicData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${topicData.name}`;

  const { error: storageError } = await supabase.storage
    .from("topics-logo")
    .upload(fileName, topicData.logo);

  if (storageError) throw new Error("Error uploading topic Logo");

  const topic_logo_url = `${supabaseUrl}/storage/v1/object/public/topics-logo/${fileName}`;

  const { data, error } = await supabase
    .from("topics")
    .insert([
      {
        name: topicData.name,
        topic_logo_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Companys");
  }

  return data;
}