import { asyncHandler } from "../utils/asyncHandler.js";
import { Link } from "../models/link.model.js";
import { User } from "../models/user.model.js";
const addLink = asyncHandler(async (req, res) => {
  const { name, link } = req.body;
  const { id, username } = req.user;
  if (!name || !link) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  const linkAvailable = await Link.findOne({ username });
  if (linkAvailable) {
    if (linkAvailable.links.length >= 10) {
      return res.status(400).json({
        success: false,
        message: "You can only add 10 links",
      });
    }
    const linkToPush = await Link.findOneAndUpdate(
      { username },
      { $push: { links: { name, link } } }
    );
    return res
      .status(201)
      .json({ success: true, linkToPush, message: "Link successfully added" });
  }
  const linkToAdd = await Link.create({
    user: id,
    username: username,
    links: [{ name, link }],
  });
  return res
    .status(201)
    .json({ success: true, linkToAdd, message: "Link Added Successfully" });
});

const updateLink = asyncHandler(async (req, res) => {
  const { name, link } = req.body;
  const { id, username } = req.user;
  if (!name || !link) {
    throw new Error("Please fill all the fields");
  }
  const getLink = await Link.findOne({ username });
  if (getLink.user.toString() !== id) {
    return res.status(400).json({ success: false, message: "Not allowed" });
  }
  if (!getLink) {
    return res
      .status(400)
      .json({ success: false, message: "No link available" });
  }
  if (getLink.links.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "No link available" });
  }
  for (let i = 0; i < getLink.links.length; i++) {
    if (getLink.links[i]._id == req.params.id) {
      const updateLink = await Link.findOneAndUpdate(
        { username, "links._id": req.params.id },
        { $set: { "links.$.name": name, "links.$.link": link } }
      );
      return res
        .status(201)
        .json({ success: true, message: "Link successfully updated" });
    }
  }
  return res.status(400).json({ success: false, message: "No link available" });
});

const getLinks = asyncHandler(async (req, res) => {
  const { id, username } = req.user;
  const links = await Link.findOne({ user: id, username });
  if (!links || links.length === 0) {
    return res
      .status(201)
      .json({ success: true, username: username, links: [] });
  }
  res
    .status(201)
    .json({ success: true, username: username, links: links.links });
});

const getLinksByUsername = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  const links = await Link.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "No user available." });
  }
  if (!links) {
    return res
      .status(400)
      .json({ success: false, message: "No links available." });
  }
  if (links.links.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "No links available." });
  }
  res
    .status(201)
    .json({ success: true, username: username, links: links.links });
});

const deleteLink = asyncHandler(async (req, res) => {
  const { id, username } = req.user;
  const link = await Link.findOne({ user: id, username });
  if (link.user.toString() !== id) {
    return res.status(400).json({ success: false, message: "Not allowed" });
  }
  if (!link) {
    return res
      .status(400)
      .json({ success: false, message: "No link available" });
  }
  if (link.links.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "No link available" });
  }
  for (let i = 0; i < link.links.length; i++) {
    if (link.links[i]._id == req.params.id) {
      const updateLink = await Link.findOneAndUpdate(
        { user: id, username },
        { $pull: { links: { _id: req.params.id } } }
      );
      return res
        .status(201)
        .json({ success: true, message: "Link successfully deleted" });
    }
  }
  return res.status(400).json({ success: false, message: "No link available" });
});

export { addLink, updateLink, getLinks, getLinksByUsername, deleteLink };
